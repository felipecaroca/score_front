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
        <form @submit.prevent="getTeams" >
          <v-text-field label="Buscar equipo..." v-model="search.name"
                        append-icon="mdi-magnify"
                        @input="checkReset"
                        ref="searchField"
          />
        </form>

      </v-col>
    </v-row>
    <simple-table :headers="['Nombre', 'Logo', 'Opciones']">
      <tr v-for="team in teams" :key="team.id">
        <td>{{team.name}}</td>
        <td>
          <v-img :src="team.logo" width="40" />
        </td>
        <td>
          <v-btn color="info"
                 fab
                 small
                 class="ma-1"
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
  export default {
    data:()=>({
      teams: [],
      visible:false,
      search: {
        name:''
      }
    }),
    created() {
      this.getTeams()
    },
    methods:{
      checkReset(){
        if (this.search.name === '')
          this.getTeams()
      },
      teamCreated(){
        this.visible = false
        this.getTeams()
      },
      getTeams(){
        let self = this
        firebase.auth().onAuthStateChanged(function(){
          self.$store.commit('setLoading', true)
          let teams = firebase.functions().httpsCallable('getTeams')
          teams(self.search).then((res) => {
            self.teams = res.data
          }).catch(err => {
            self.$store.commit('openSnackBar', {
              color: 'error',
              message: err
            })
          }).finally(() => {
            self.$store.commit('setLoading', false)
            self.$refs.searchField.focus()
          })
        })
      },
      deleteTeam(data){
        let self = this
        this.$store.commit('setLoading', true)
        let deleteTeam = firebase.functions().httpsCallable('deleteTeam')
        deleteTeam(data).then(()=>{
          self.$store.commit('openSnackBar', {
            color: 'success',
            message: 'Registro eliminado exitosamente'
          })
          self.getTeams()
        }).catch(err=>{
          self.$store.commit('openSnackBar',{
            color:'error',
            message: err
          })
        }).finally(()=> self.$store.commit('setLoading', false))
      }
    }
  }
</script>