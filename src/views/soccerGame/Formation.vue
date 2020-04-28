<template>
  <v-container>
    <v-row>
      <v-col  sm="4" md="3" lg="2" align="center">
        <v-switch v-model="visit" :label="switchText" color="success"/>
        <p>Equipo {{visit?'Visita':'Local'}}</p>
        <team-shield-view :team="currentTeam" :width="50" />
      </v-col>
      <v-col>
        <v-card>
          <v-card-title class="success white--text lighten-1">
            Formación
          </v-card-title>
          <v-card-text>
            <formation-form :teamId="currentTeam.id" :soccerGameId="soccerGameId" />
            <simple-table :headers="['Jugador', 'N° Camiseta', 'Titular']">

            </simple-table>
          </v-card-text>
          <v-card-actions>

          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import {SoccerGame} from "../../Models/SoccerGame"

  export default {
    data:()=>({
      visit: false,
      soccerGame: null,
      soccerGameId: null
    }),
    created() {
      if(this.$route.params.id)
        this.soccerGameId = this.$route.params.id
      this.getSoccerGame()
    },
    methods:{
      getSoccerGame(){
        SoccerGame.Get(this.soccerGameId, (res)=>{
          this.soccerGame = new SoccerGame(res.data)
        })
      }
    },
    computed:{
      switchText(){
        return this.visit?'Getionar Local':'Getionar Visita'
      },
      currentTeam(){
        if (!this.soccerGame)
          return {}
        return this.visit?this.soccerGame.visit:this.soccerGame.local
      }
    }
  }
</script>
