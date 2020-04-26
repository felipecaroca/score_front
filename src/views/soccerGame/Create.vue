<template>
  <v-container>
    <v-form v-model="soccerFormValid" ref="soccerGameForm" @submit.prevent="postSoccerGame">
      <v-row>
        <v-col align="center">
          <p>Fecha del Partido</p>
          <v-date-picker locale="cl"
                         first-day-of-week="1"
                         :landscape="true"
                         v-model="soccerGame.gameDate"
                         class="mr-1"
                         header-color="success"

          />
        </v-col>
        <v-col align="center">
          <p>Hora del Partido</p>
          <v-time-picker :landscape="true"
                         class="ml-1"
                         v-model="soccerGame.gameTime"
                         header-color="success"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col align="center">
          <v-autocomplete
              :items="local"
              item-text="name"
              item-value="id"
              v-model="localId"
              label="Seleccione Equipo Local"
              solo
              :rules="requiredRule"
          />
          <v-img :src="soccerGame.local.logo" class="mb-3" width="100" />
        </v-col>
        <v-col align="center">
          <v-autocomplete
              :items="visit"
              label="Seleccione Equipo Visita"
              item-text="name"
              item-value="id"
              v-model="visitId"
              solo
              :rules="requiredRule"
          />
          <v-img :src="soccerGame.visit.logo" class="mb-3" width="100" />
        </v-col>
      </v-row>
      <v-row>
        <v-col align="center">
          <return-button path="/soccer_games">
            Volver a Partidos
          </return-button>
          <v-btn color="success" @click="postSoccerGame">
            <v-icon>mdi-plus</v-icon>
            Crear
          </v-btn>
        </v-col>
      </v-row>
    </v-form>

  </v-container>
</template>

<script>
  import {SoccerGame} from "../../Models/SoccerGame"
  import {Team} from "../../Models/Team"

  export default {
    data:()=>({
      soccerFormValid: false,
      soccerGame: new SoccerGame(),
      teams: [],
      localId:'',
      visitId:'',
      requiredRule:[
        v=>!!v || 'este campo es requerido'
      ]
    }),
    created() {
      this.getTeams()
    },
    watch:{
      localId: function () {
        let local = this.teams.filter(a=>a.id === this.localId)
        if (local.length === 1)
          this.soccerGame.local = local[0]
        else
          this.soccerGame.local = new Team()
      },
      visitId: function () {
        let visit = this.teams.filter(a=>a.id === this.visitId)
        if(visit.length === 1)
          this.soccerGame.visit = visit[0]
        else
          this.soccerGame.visit = new Team()
      }
    },
    methods:{
      getTeams(){
        Team.List(null, (res)=>{
          this.teams = []
          res.data.forEach(reg=>{
            this.teams.push(new Team(reg))
          })
        })
      },
      postSoccerGame(){
        let errMessage = ''
        if (!this.soccerGame.gameDate)
          errMessage = 'debe agregar la fecha en que se jugará el partido; '

        if(!this.soccerGame.gameTime)
          errMessage += 'debe agregar la hora en que se jugará el partido'
        if (errMessage){
          this.$store.commit('openSnackBar', {
            color: 'error',
            message: errMessage
          })
        }else{
          let self = this
          if(this.$refs.soccerGameForm.validate()){
            this.soccerGame.Post(()=>{
              self.$store.commit('openSnackBar', {
                color:'success',
                message: 'Partido creado exitosamente'
              })
              this.soccerGame = new SoccerGame()
            })
          }
        }
      }
    },
    computed:{
      visit(){
        return this.teams.filter(a=>a.id !== this.localId)
      },
      local(){
        return this.teams.filter(a=>a.id !== this.visitId)
      }
    }
  }
</script>