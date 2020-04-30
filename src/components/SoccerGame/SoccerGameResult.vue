<template>
  <v-row v-if="soccerGame">
    <v-col>
      <v-row>
        <v-col align="center">
          <v-card>
            <v-card-text>
              <team-shield-view :team="soccerGame.local" width="100" />
              <p class="display-2">{{localScore}}</p>
              <v-card-title>Goles</v-card-title>
              <simple-table :headers="['Jugador', 'Minuto', 'Tiempo']">
                <tr v-for="goal in localGoals" :key="goal.id">
                  <td>
                    <v-img :src="goal.player.photo" width="50" v-if="goal.player.photo" />
                    {{goal.player.fullName}}
                  </td>
                  <td>{{goal.minute}}</td>
                  <td>{{goal.half}}</td>
                </tr>
              </simple-table>
              <v-card-title>Tarjetas</v-card-title>
              <simple-table :headers="['Jugador','Tarjeta', 'Minuto', 'Tiempo']">
                <tr v-for="card in localCards" :key="card.id">
                  <td>
                    <v-img :src="card.player.photo" width="50" v-if="card.player.photo" />
                    {{card.player.fullName}}
                  </td>
                  <td>
                    <v-icon :color="card.isYellow?'yellow':'error'">mdi-file</v-icon>
                  </td>
                  <td>{{card.minute}}</td>
                  <td>{{card.half}}</td>
                </tr>
              </simple-table>
              <v-card-title>Cambios</v-card-title>
              <simple-table :headers="['Minuto', 'Tiempo', 'Entró', 'Salió']">
                <tr v-for="change in localChanges" :key="change.id">
                  <td>{{change.time}}</td>
                  <td>{{change.half}}</td>
                  <td>
                    <v-img :src="change.inPlayer.photo" v-if="change.inPlayer.photo" width="50" />
                    {{change.inPlayer.fullName}}
                  </td>
                  <td>
                    <v-img :src="change.outPlayer.photo" v-if="change.outPlayer.photo" width="50"/>
                    {{change.outPlayer.fullName}}
                  </td>
                </tr>
              </simple-table>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col align="center">
          <v-card>
            <v-card-text>
              <team-shield-view :team="soccerGame.visit" width="100" />
              <p class="display-2">{{visitScore}}</p>
              <v-card-title>Goles</v-card-title>
              <simple-table :headers="['Jugador', 'Minuto', 'Tiempo']">
                <tr v-for="goal in visitGoals" :key="goal.id">
                  <td>
                    <v-img :src="goal.player.photo" width="50" v-if="goal.player.photo" />
                    {{goal.player.fullName}}
                  </td>
                  <td>{{goal.minute}}</td>
                  <td>{{goal.half}}</td>
                </tr>
              </simple-table>
              <v-card-title>Tarjetas</v-card-title>
              <simple-table :headers="['Jugador','Tarjeta', 'Minuto', 'Tiempo']">
                <tr v-for="card in visitCards" :key="card.id">
                  <td>
                    <v-img :src="card.player.photo" width="50" v-if="card.player.photo" />
                    {{card.player.fullName}}
                  </td>
                  <td>
                    <v-icon :color="card.isYellow?'yellow':'error'">mdi-file</v-icon>
                  </td>
                  <td>{{card.minute}}</td>
                  <td>{{card.half}}</td>
                </tr>
              </simple-table>
              <v-card-title>Cambios</v-card-title>
              <simple-table :headers="['Minuto', 'Tiempo', 'Entró', 'Salió']">
                <tr v-for="change in visitChanges" :key="change.id">
                  <td>{{change.time}}</td>
                  <td>{{change.half}}</td>
                  <td>
                    <v-img :src="change.inPlayer.photo" v-if="change.inPlayer.photo" width="50" />
                    {{change.inPlayer.fullName}}
                  </td>
                  <td>
                    <v-img :src="change.outPlayer.photo" v-if="change.outPlayer.photo" width="50" />
                    {{change.outPlayer.fullName}}
                  </td>
                </tr>
              </simple-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
  import {SoccerGame} from "../../Models/SoccerGame"
  import {Formation} from "../../Models/Formation"

  export default {
    props:['soccerGameId'],
    data:()=>({
      soccerGame: null,
      formation:[]
    }),
    created() {
      if(this.soccerGameId){
        this.getSoccerGame()
        this.getFormation()
      }
    },
    methods:{
      getSoccerGame(){
        SoccerGame.Get(this.soccerGameId, (res)=>{
          this.soccerGame = new SoccerGame(res.data)
        })
      },
      getFormation(){
        Formation.List({soccerGameId: this.soccerGameId}, (res) => {
          this.formation = []
          res.data.forEach(reg => {
            this.formation.push(new Formation(reg))
          })
        })
      },
      computeGoal(formation){
        let goals = []
        formation.forEach(f=>{
          if(f.goals){
            f.goals.forEach(goal=>{
              goal.player = f.player
              goals.push(goal)
            })
          }
        })
        return goals
      },
      computeCards(formation){
        let cards =[]
        formation.forEach(f=>{
          if(f.cards){
            f.cards.forEach(card=>{
              card.player = f.player
              cards.push(card)
            })
          }
        })
        return cards
      },
      computeChanges(changes){
        let tmp = []
        changes.forEach(change=>{

          change.inPlayer = this.formation? this.formation.filter(a=>a.id === change.formationIn):[]
          change.inPlayer = change.inPlayer.length === 1?  change.inPlayer[0].player:{}
          change.outPlayer = this.formation? this.formation.filter(a=>a.id === change.formationOut):[]
          change.outPlayer = change.outPlayer.length === 1?change.outPlayer[0].player:{}
          tmp.push(change)
        })
        return tmp
      }
    },
    computed:{
      localFormation(){
        return this.soccerGame?
          this.formation.filter(a=>a.teamId === this.soccerGame.local.id):[]
      },
      localScore(){
        return this.localGoals.length
      },
      localGoals(){
        return this.computeGoal(this.localFormation)
      },
      localCards(){
        return this.computeCards(this.localFormation)
      },
      localChanges(){
        return this.computeChanges(this.soccerGame.changes?
          this.soccerGame.changes.filter(a=>a.isLocal):[]
        )
      },
      visitFormation(){
        return this.soccerGame?
          this.formation.filter(a=>a.teamId === this.soccerGame.visit.id):[]
      },
      visitScore(){
        return this.visitGoals.length
      },
      visitGoals(){
        return this.computeGoal(this.visitFormation)
      },
      visitCards(){
        return this.computeCards(this.visitFormation)
      },
      visitChanges(){
        return this.computeChanges(this.soccerGame.changes?
          this.soccerGame.changes.filter(a=>!a.isLocal):[]
        )
      }
    }
  }
</script>