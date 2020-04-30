<template>
  <v-container>
    <v-row>
      <v-col md="3">
        <team-form :teamId="teamId"></team-form>
      </v-col>
      <v-col>
        <p class="display-1">Miembros del Equipo</p>
        <v-row>
          <v-col>
            <v-text-field label="Buscar por nombre..."
                          @keyup.enter="getPlayers"
                          v-model="search.name"
            />
          </v-col>
          <v-col>
            <v-btn small
                   class="mt-4"
                   @click="getPlayers"
            >
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-form v-model="playerValid" @submit.prevent="addPlayer" ref="playerForm">
          <v-row>
            <v-col md3 sm4>
              <v-text-field label="Nombre..."
                            v-model="player.name"
                            :rules="requiredRule"
              />
            </v-col>
            <v-col md3 sm4>
              <v-text-field label="Apellidos..."
                            v-model="player.lastName"
                            :rules="requiredRule"
              />
            </v-col>
            <v-col md3 sm4>
              <v-text-field label="Correo..."
                            v-model="player.mail"
                            :rules="emailRules"
                            @keyup.enter="addPlayer"
              />
            </v-col>
            <v-col md3 sm4 align="center" justify="center">
              <v-btn small
                     color="success"
                     @click="addPlayer"
                     class="mt-5"
              >
                <v-icon>mdi-plus</v-icon>
                Agregar
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
        <simple-table :headers="['Nombre', 'Apellidos', 'Correo', 'Opciones']" height="300px">
            <tr v-for="player in players" :key="player.id">
              <td>{{player.name}}</td>
              <td>{{player.lastName}}</td>
              <td>{{player.mail}}</td>
              <td>
                <v-btn color="info"
                       small
                       fab
                       :to="'/teams/edit/'+teamId+'/player/edit/'+player.id"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <confirm-dialog :fab="true"
                                :small="true"
                                color="error"
                                icon="mdi-delete"
                                @onAccept="deletePlayer(player)"
                >
                  <span slot="acceptBtn">Eliminar</span>
                  <span slot="title">Confirmación de Operación</span>
                  <v-row>
                    <v-col align="center">
                      Esta a punto de eliminar un jugador. Esta acción no puede ser revertida.
                      ¿Desea Continuar?
                    </v-col>
                  </v-row>
                </confirm-dialog>
              </td>
            </tr>
        </simple-table>
        <return-button path="/teams" class="mt-2">
          Volver a Equipos
        </return-button>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import {Player} from "../../Models/Player"

  export default {
    data: () => ({
      teamId: null,
      player: new Player(),
      search: {
        mail: ''
      },
      players: [],
      playerValid: false,
      requiredRule: [
        v => !!v || 'este campo es requerido'
      ],
      emailRules: [
        v => !!v || 'este campo es requerido',
        v => /.+@.+\..+/.test(v) || 'debe agregar un email válido',
      ]
    }),
    created() {
      if (this.$route.params.id) {
        this.teamId = this.$route.params.id
        this.getPlayers()
      }
    },
    methods: {
      addPlayer() {
        if (this.$refs.playerForm.validate()) {
          this.player.teamId = this.teamId
          this.player.Post(() => {
            this.player = new Player()
            this.$refs.playerForm.reset()
            this.getPlayers()
          })
        }
      },
      getPlayers() {
        this.search.teamId = this.teamId
        Player.List(this.search, (res) => {
          this.players = []
          res.data.forEach(reg => {
            this.players.push(new Player(reg))
          })
        })
      },
      deletePlayer(player) {
        player.Delete(() => {
          this.getPlayers()
        })
      }
    }
  }
</script>
