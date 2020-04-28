<template>
  <v-container>
    <v-form v-model="formationValid" ref="formationForm">
      <v-row>
        <v-col>
          <v-autocomplete label="Jugador"
                          :items="availablePlayers"
                          item-text="fullName"
                          item-value="id"
                          :rules="requiredRules"
                          v-model="formation.playerId"
          />
        </v-col>
        <v-col>
          <v-text-field label="N° Camiseta"
                        :rules="requiredRules"
                        v-model="formation.number"
          />
        </v-col>
        <v-col>
          <v-switch v-model="formation.isHolder" label="Es Titular"/>
        </v-col>
        <v-col>
          <v-btn color="success"
                 class="mt-3"
                 @click="save"
          >
            <v-icon>mdi-plus</v-icon>
            Agregar
          </v-btn>
          {{formation}}
        </v-col>
      </v-row>
    </v-form>

  </v-container>
</template>

<script>
  import {Formation} from "../../Models/Formation"
  import {Player} from "../../Models/Player";

  export default {
    props: ['soccerGameId', 'teamId', 'currentFormation'],
    data: () => ({
      formationValid: false,
      formation: new Formation(),
      players: [],
      requiredRules: [
        v => !!v || 'el campo es requerido'
      ]
    }),
    watch: {
      teamId: function () {
        if (this.teamId)
          this.getPlayers()
      }
    },
    created() {
    },
    methods: {
      save() {
        if (this.$refs.formationForm.validate()) {
          if (!this.teamId) {
            this.showError('No se encontró un equipo al que asociar el jugador')
          } else if(!this.soccerGameId){
            this.showError('no se encontró al que partido pertenece esta configuración')
          } else {
            if (this.selectedNumbers.filter(a => a === this.formation.number).length > 0) {
              this.showError('el numero ' + this.formation.number + ' ya esta seleccionado')
            } else if (this.holderCount > 11) {
              this.showError('ya se encuentran los 11 titulares en la formación')
            } else {
              this.formation.teamId = this.teamId
              this.formation.soccerGameId = this.soccerGameId
              this.formation.Post(() => {
                this.$store.commit('openSnackBar', {
                  color: 'success',
                  message: 'Jugador agregado a fomración'
                })
                this.formation = new Formation()
              })
            }
          }
        }
      },
      getPlayers() {
        Player.List({teamId: this.teamId}, (res) => {
          this.players = []
          res.data.forEach(reg => {
            this.players.push(new Player(reg))
          })
        })
      },
      showError(message) {
        this.$store.commit('openSnackBar', {
          color: 'error',
          message: message
        })
      }
    },
    computed: {
      availablePlayers() {
        let tmp = []
        if (this.players && this.players.length > 0) {
          this.players.forEach(player => {
            if (!this.currentFormation ||
              (this.currentFormation && this.currentFormation.filter(a => a.playerId === player.id).length === 0))
              tmp.push(player)
          })
        }
        return tmp
      },
      selectedNumbers() {
        return this.currentFormation ?
          this.currentFormation.map(formation => {
            return formation.number
          }) : []
      },
      holderCount() {
        return this.currentFormation ?
          this.currentFormation.filter(a => a.isHolder).length : 0
      }
    }
  }
</script>
