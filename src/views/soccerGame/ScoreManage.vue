<template>
  <v-container v-if="soccerGame">
    <v-row>
      <v-col align="center">
        <p class="display-2">{{localGoals}} - {{visitGoals}}</p>
        <v-btn @click="showFullScreen">
          <v-icon>mdi-fullscreen</v-icon>
          Marcador Pantalla Completa
        </v-btn>
        <time-view :soccerGame="soccerGame" :isRunning="soccerGame.isRunning" />
        <v-btn class="ma-1"
               color="success"
               :disabled="soccerGame.isRunning || soccerGame.gameFinished"
               @click="initTime"
        >
          <v-icon>mdi-play</v-icon>
          Iniciar Tiempo
        </v-btn>
        <v-btn color="error"
               class="ma-1"
               :disabled="!soccerGame.isRunning"
               @click="finishTime"
        >
          <v-icon>mdi-stop</v-icon>
          Terminar Tiempo
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-text>
            <v-card-title>
              <p>Titulares de {{soccerGame.local.name}}</p>
            </v-card-title>
            <simple-table :headers="['Nombre','Camiseta', 'Goles','Amarillas','Rojas']" :notFixed="true">
              <tr v-for="reg in localHolderFormation" :key="reg.id">
                <td>{{reg.player.fullName}}</td>
                <td>{{reg.number}}</td>
                <td>
                  <v-tooltip top>
                    <template v-slot:activator="{on}">
                      <v-btn small
                             v-on="on"
                             @click="addGoal(reg)"
                             :disabled="!soccerGame.isRunning"
                      >
                        {{reg.goals?reg.goals.length:0}}
                      </v-btn>
                    </template>
                    <span>Marcar Gol</span>
                  </v-tooltip>
                </td>
                <td>
                  <v-tooltip top>
                    <template v-slot:activator="{on}">
                      <v-btn small
                             color="yellow"
                             v-on="on"
                             @click="addCard(reg,true)"
                             :disabled="!soccerGame.isRunning"
                      >
                        {{reg.cards?reg.cards.filter(a=>a.isYellow).length:0}}
                      </v-btn>
                    </template>
                    <span>Marcar Tarjeta Amarilla</span>
                  </v-tooltip>
                </td>
                <td>
                  <v-tooltip top>
                    <template v-slot:activator="{on}">
                      <v-btn small
                             color="red"
                             class="white--text"
                             v-on="on"
                             @click="addCard(reg, false)"
                             :disabled="!soccerGame.isRunning"
                      >
                        {{reg.cards?reg.cards.filter(a=>!a.isYellow).length:0}}
                      </v-btn>
                    </template>
                    <span>Marcar Tarjeta Roja</span>
                  </v-tooltip>
                </td>
              </tr>
            </simple-table>
            <v-card-title>
              <p>Reservas</p>
            </v-card-title>
            <simple-table :headers="['Nombre', 'Camiseta','Cambiar']" :notFixed="true">
              <tr v-for="reg in localNotHolderFormation" :key="reg.id">
                <td>{{reg.player.fullName}}</td>
                <td>{{reg.number}}</td>
                <td></td>
              </tr>
            </simple-table>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-card-text>
            <v-card-title>
              <p>Titulares de {{soccerGame.visit.name}}</p>
            </v-card-title>
            <simple-table :headers="['Nombre', 'Camiseta','Goles','Amarillas','Rojas']" :notFixed="true">
              <tr v-for="reg in visitHolderFormation" :key="reg.id">
                <td>{{reg.player.fullName}}</td>
                <td>{{reg.number}}</td>
                <td>
                  <v-tooltip top>
                    <template v-slot:activator="{on}">
                      <v-btn small
                             v-on="on"
                             @click="addGoal(reg)"
                             :disabled="!soccerGame.isRunning"
                      >
                        {{reg.goals?reg.goals.length:0}}
                      </v-btn>
                    </template>
                    <span>Marcar Gol</span>
                  </v-tooltip>
                </td>
                <td>
                  <v-tooltip top>
                    <template v-slot:activator="{on}">
                      <v-btn small
                             color="yellow"
                             v-on="on"
                             @click="addCard(reg,true)"
                             :disabled="!soccerGame.isRunning"
                      >
                        {{reg.cards?reg.cards.filter(a=>a.isYellow).length:0}}
                      </v-btn>
                    </template>
                    <span>Marcar Tarjeta Amarilla</span>
                  </v-tooltip>
                </td>
                <td>
                  <v-tooltip top>
                    <template v-slot:activator="{on}">
                      <v-btn small
                             color="red"
                             class="white--text"
                             v-on="on"
                             @click="addCard(reg, false)"
                             :disabled="!soccerGame.isRunning"
                      >
                        {{reg.cards?reg.cards.filter(a=>!a.isYellow).length:0}}
                      </v-btn>
                    </template>
                    <span>Marcar Tarjeta Roja</span>
                  </v-tooltip>
                </td>
              </tr>
            </simple-table>
            <v-card-title>
              <p>Reservas</p>
            </v-card-title>
            <simple-table :headers="['Nombre', 'Camiseta','Cambiar']" :notFixed="true">
              <tr v-for="reg in visitNotHolderFormation" :key="reg.id">
                <td>{{reg.player.fullName}}</td>
                <td>{{reg.number}}</td>
                <td></td>
              </tr>
            </simple-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import {SoccerGame} from "../../Models/SoccerGame"
  import {Formation} from "../../Models/Formation";
  import {Goal} from "../../Models/Goal";
  import {Card} from "../../Models/Card";


  export default {
    data: () => ({
      formation: [],
      soccerGameId: null,
      soccerGame: null,
    }),
    created() {
      if (this.$route.params.id)
        this.soccerGameId = this.$route.params.id
    },
    watch: {
      soccerGameId: function () {
        this.getSoccerGame()
        this.getFormation()
      }
    },
    methods: {
      initTime(){
        if(this.soccerGame && (!this.soccerGame.initFirstTime || !this.soccerGame.initLastTime)){
          this.soccerGame.isRunning = true
          this.soccerGame.time='00:00'
          if (!this.soccerGame.initFirstTime){
            this.soccerGame.initFirstTime = new Date().getTime()
          }else{
            this.soccerGame.initLastTime = new Date().getTime()
          }
          this.soccerGame.Update(()=>{
            this.$store.commit('openSnackBar',{
              color: 'success',
              message:'Tiempo iniciado'
            })
          })
        }
      },
      finishTime(){
        this.soccerGame.isRunning = false
        if (!this.soccerGame.finishFirstTime){
          this.soccerGame.finishFirstTime = new Date().getTime()
        }else{
          this.soccerGame.finishLastTime = new Date().getTime()
          this.soccerGame.gameFinished = true
        }
        this.soccerGame.Update(()=>{
          this.$store.commit('openSnackBar',{
            color: 'success',
            message:'Tiempo finalizado'
          })
        })
      },
      getSoccerGame() {
        SoccerGame.Get(this.soccerGameId, (res) => {
          this.soccerGame = new SoccerGame(res.data)
        })
      },
      getFormation() {
        Formation.List({soccerGameId: this.soccerGameId}, (res) => {
          this.formation = []
          res.data.forEach(reg => {
            this.formation.push(new Formation(reg))
          })
        })
      },
      addGoal(formation) {
        if (this.soccerGame && this.soccerGame.isRunning) {
          let newGoal = new Goal({
            formationId: formation.id,
            minute: this.soccerGame.time
          })
          formation.goals.push(newGoal)
          formation.Update(()=>{
            this.getFormation()
          })
        }
      },
      addCard(formation, isYellow) {
        if (this.soccerGame && this.soccerGame.isRunning){
          let newCard = new Card({
            formationId: formation.id,
            isYellow: isYellow,
            minute: this.soccerGame.time
          })
          formation.cards.push(newCard)
          formation.Update(()=>{
            this.getFormation()
          })
        }
      },
      showFullScreen(){
        window.open('/score/'+this.soccerGame.id)
      }
    },
    computed: {
      localHolderFormation() {
        return this.formation && this.soccerGame ?
          this.formation.filter(a => a.teamId === this.soccerGame.local.id && a.isHolder) : []
      },
      localNotHolderFormation() {
        return this.formation && this.soccerGame ?
          this.formation.filter(a => a.teamId === this.soccerGame.local.id && !a.isHolder) : []
      },
      visitHolderFormation() {
        return this.formation && this.soccerGame ?
          this.formation.filter(a => a.teamId === this.soccerGame.visit.id && a.isHolder) : []
      },
      visitNotHolderFormation() {
        return this.formation && this.soccerGame ?
          this.formation.filter(a => a.teamId === this.soccerGame.visit.id && !a.isHolder) : []
      },
      localGoals(){
        let goals = 0
        let localPlayers = this.formation && this.soccerGame ?
          this.formation.filter(a => a.teamId === this.soccerGame.local.id) : []
        localPlayers.forEach(reg=>{
          if(reg.goals && reg.goals.length > 0)
            goals +=  reg.goals.length
        })
        return goals
      },
      visitGoals(){
        let goals = 0
        let visitPlayers = this.formation && this.soccerGame ?
          this.formation.filter(a => a.teamId === this.soccerGame.visit.id) : []
        visitPlayers.forEach(reg=>{
          if(reg.goals && reg.goals.length > 0)
            goals +=  reg.goals.length
        })
        return goals
      }
    }
  }
</script>