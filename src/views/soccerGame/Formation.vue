<template>
  <v-container>
    <v-row>
      <v-col sm="4" md="3" lg="2" align="center">
        <v-switch v-model="visit" :label="switchText" color="success"/>
        <p>Equipo {{visit?'Visita':'Local'}}</p>
        <team-shield-view :team="currentTeam" :width="50"/>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title class="success white--text lighten-1">
            Formación
          </v-card-title>
          <v-card-text>
            <formation-form :teamId="currentTeam.id"
                            :soccerGameId="soccerGameId"
                            :currentFormation="currentFormation"
                            @saved="getFormation"
            />
            <v-row>
              <v-col>
                <p>Titulares</p>
                <simple-table :headers="['Jugador', 'N° Camiseta','Eliminar']"

                >
                  <tr v-for="formation in holders"
                      :key="formation.id">
                    <td>{{formation.player?formation.player.fullName:'No Disponible'}}</td>
                    <td>{{formation.number}}</td>
                    <td>
                      <v-btn color="error"
                             fab
                             small
                             @click="deleteFormation(formation)"
                      >
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </simple-table>
              </v-col>
              <v-col>
                <p>Reservas</p>
                <simple-table :headers="['Jugador', 'N° Camiseta','Eliminar']"
                              height="300px"
                >
                  <tr v-for="formation in notHolders"
                      :key="formation.id">
                    <td>{{formation.player?formation.player.fullName:'No Disponible'}}</td>
                    <td>{{formation.number}}</td>
                    <td>
                      <v-btn color="error"
                             fab
                             small
                             @click="deleteFormation(formation)"
                      >
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </simple-table>
              </v-col>
            </v-row>

          </v-card-text>
          <v-card-actions>
            <v-row>
              <v-col align="center">
                <return-button path="/soccer_games">
                  Volver a Partidos
                </return-button>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import {SoccerGame} from "../../Models/SoccerGame"
  import {Formation} from "../../Models/Formation"

  export default {
    data: () => ({
      visit: false,
      soccerGame: null,
      soccerGameId: null,
      currentFormation: []
    }),
    created() {
      if (this.$route.params.id)
        this.soccerGameId = this.$route.params.id
      this.getFormation()
    },
    methods: {
      getSoccerGame() {
        SoccerGame.Get(this.soccerGameId, (res) => {
          this.soccerGame = new SoccerGame(res.data)
        })
      },
      getFormation() {
        Formation.List({soccerGameId: this.soccerGameId}, (res) => {
          this.currentFormation = []
          res.data.forEach(reg => {
            let tmp = new Formation(reg)
            this.currentFormation.push(tmp)
          })
        }, ()=>{
          if ((this.soccerGame && this.soccerGame.id !== this.soccerGameId) || !this.soccerGame)
            this.getSoccerGame()
          else
            this.$store.commit('setLoading', false)
        })
      },
      deleteFormation(formation) {
        formation.Delete(() => {
          this.getFormation()
        })
      }
    },
    computed: {
      switchText() {
        return this.visit ? 'Gestionar Local' : 'Gestionar Visita'
      },
      currentTeam() {
        if (!this.soccerGame)
          return {}
        return this.visit ? this.soccerGame.visit : this.soccerGame.local
      },
      holders() {
        let teamId = ''
        if (this.soccerGame)
          teamId = this.visit ? this.soccerGame.visit.id : this.soccerGame.local.id
        return this.currentFormation ? this.currentFormation.filter(a => a.isHolder && a.teamId === teamId) : []
      },
      notHolders() {
        let teamId = ''
        if (this.soccerGame)
          teamId = this.visit ? this.soccerGame.visit.id : this.soccerGame.local.id
        return this.currentFormation ? this.currentFormation.filter(a => !a.isHolder && a.teamId === teamId) : []
      }
    }
  }
</script>
