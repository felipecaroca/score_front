<template>
  <v-container>
    <v-row>
      <v-col>
        <v-dialog
            v-model="visible"
            width="500"
        >
          <template v-slot:activator="{ on }">
            <v-btn
                color="success"
                dark
                v-on="on"
                class="mt-6"
            >
              <v-icon>mdi-plus</v-icon>
              Agregar
            </v-btn>
          </template>

          <v-card>
            <v-card-title
                class="headline success lighten-1 white--text"
                primary-title
            >
              Agregar Equipo
            </v-card-title>

            <v-card-text>
              <team-form @created="teamCreated"></team-form>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="error"
                  text
                  @click="visible = false"
              >
                Cerrar
              </v-btn>

            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
      <v-col>
        <form @submit.prevent="getTeams">
          <v-row>
            <v-col>
              <v-text-field label="Buscar equipo..." v-model="search.name"
                            append-icon="mdi-magnify"
                            ref="searchField"
              />
            </v-col>
            <v-col class="mt-3">
              <v-btn @click="getTeams">
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </v-col>
          </v-row>

        </form>

      </v-col>
    </v-row>
    <simple-table :headers="['Nombre', 'Logo', 'Opciones']">
      <tr v-for="team in teams" :key="team.id">
        <td>{{team.name}}</td>
        <td>
          <v-img :src="team.logo" width="40"/>
        </td>
        <td>
          <v-btn color="info"
                 fab
                 small
                 class="ma-1"
                 :to="'/teams/edit/'+team.id"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <confirm-dialog :fab="true" :small="true" color="error" icon="mdi-delete" @onAccept="deleteTeam(team)">
            <span slot="acceptBtn">Eliminar</span>
            <span slot="title">Confirmación de Operación</span>
            <v-row>
              <v-col align="center">
                Esta a punto de eliminar un equipo. Esta acción no puede ser revertida. ¿Desea Continuar?
              </v-col>
            </v-row>
          </confirm-dialog>
        </td>
      </tr>
    </simple-table>
  </v-container>
</template>

<script>
  import firebase from 'firebase/app'
  import {Team} from "../../Models/Team"

  export default {
    data: () => ({
      teams: [],
      visible: false,
      search: {
        name: ''
      }
    }),
    created() {
      this.getTeams()
    },
    methods: {
      teamCreated() {
        this.visible = false
        this.getTeams()
      },
      getTeams() {
        let self = this
        firebase.auth().onAuthStateChanged(function () {
          Team.List(self.search, (res) => {
            self.teams = []
            res.data.forEach(reg => {
              self.teams.push(new Team(reg))
            })
          }, () => {
            self.$store.commit('setLoading', false)
            if (self.$refs.searchField)
              self.$refs.searchField.focus()
          })
        })
      },
      deleteTeam(data) {
        let self = this
        data.Delete(() => {
          self.$store.commit('openSnackBar', {
            color: 'success',
            message: 'Registro eliminado exitosamente'
          })
          self.getTeams()
        })
      }
    }
  }
</script>