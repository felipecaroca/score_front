<template>
  <v-parallax :src="scoreBack" v-if="soccerGame">
    <v-row justify="space-around" align="center">
      <v-sheet
          :width="500"
          :elevation="3"
          color="#385F73"

      >
        <v-card color="#385F73" dark class="ma-2">
          <v-card-title>
            <v-row>
              <v-col align="center" justify="center">
                <team-shield-view :team="soccerGame.local" width="50"/>
              </v-col>
              <v-col align="center" justify="center">
                <team-shield-view :team="soccerGame.visit" width="50" />
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col align="center">
                <p class="display-2">
                  {{totalLocalGoals}}
                </p>
              </v-col>
              <v-col align="center">
                <p class="display-2">
                  {{totalVisitGoals}}
                </p>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            {{localGoals}}
          </v-card-actions>
        </v-card>
      </v-sheet>
    </v-row>
  </v-parallax>
</template>

<script>
  import scoreBack from '../../assets/score_backgroud.jpg'
  import firebase from 'firebase/app'
  import {Formation} from "../../Models/Formation";

  export default {
    props: ['soccerGameId'],
    data: () => ({
      scoreBack,
      soccerGame: null,
      formation:[],
    }),
    created() {
      let self = this
      firebase.auth().onAuthStateChanged(function (user) {
        if (self.soccerGameId) {
          self.getSoccerGame(user.uid)
          self.getFormation(user.uid)
        }
      })
    },
    methods: {
      getSoccerGame(uid) {
        let self = this
        firebase.firestore().collection('users')
          .doc(uid).collection('soccer_games')
          .doc(self.soccerGameId).onSnapshot(snapshot => {
            self.soccerGame = snapshot.data()
        })
      },
      getFormation(uid){
        let self = this
        firebase.firestore().collection('users')
        .doc(uid).collection('formations')
        .onSnapshot(snapshot => {
          self.formation =[]
          snapshot.docs.forEach(reg=>{
            self.formation.push(new Formation(reg.data()))
          })
        })
      }
    },
    computed:{
      localFormation(){
        return this.formation && this.soccerGame?
          this.formation.filter(a=>a.teamId === this.soccerGame.local.id):[]
      },
      visitFormation(){
        return this.formation && this.soccerGame?
          this.formation.filter(a=>a.teamId === this.soccerGame.visit.id):[]
      },
      localGoals(){
        return [...this.localFormation.map(formation=>{
          return formation.goals
        })]
      },
      visitGoals(){
        return [...this.visitFormation.map(formation=>{
          return formation.goals
        })]
      },
      totalLocalGoals(){
        return this.localGoals.length
      },
      totalVisitGoals(){
        return this.visitGoals.length
      }
    }
  }
</script>
