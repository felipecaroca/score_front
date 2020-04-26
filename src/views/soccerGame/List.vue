<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn color="success"
               to="/soccer_games/new"
               class="mt-5"
        >
          <v-icon>mdi-plus</v-icon>
          Agregar Partido
        </v-btn>
      </v-col>
      <v-col>
        <v-row>
          <v-col>
            <v-text-field label="Buscar por fecha..."
                          v-model="search.date"
            />
          </v-col>
          <v-col>
            <v-btn small
                   class="mt-5"
            >
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <simple-table :headers="['Fecha', 'Local', 'Visita', 'Opciones']">
      <tr v-for="soccerGame in soccerGames" :key="soccerGame.id" >
        <td>{{soccerGame.gameDate}}</td>
        <td>{{soccerGame.local.name}}</td>
        <td>{{soccerGame.visit.name}}</td>
        <td>
          <v-btn color="info"
                 small
                 fab
                 class="ma-1"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn color="success"
                 small
                 fab
                 class="ma-1"
          >
            <v-icon>mdi-soccer</v-icon>
          </v-btn>
          <confirm-dialog :small="true" color="error"
                          :fab="true" icon="mdi-delete"
                          @onAccept="deleteSoccerGame(soccerGame)"
          >
            <span slot="acceptBtn">Eliminar</span>
            <span slot="title">Conrifmación de Operación</span>
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
  import {SoccerGame} from "../../Models/SoccerGame"

  export default {
    data:()=>({
      search:{
        date: null
      },
      soccerGames:[]
    }),
    created() {
      this.getSoccerGames()
    },
    methods:{
      getSoccerGames(){
        SoccerGame.List(this.search, (res)=>{
          this.soccerGames = []
          res.data.forEach(reg=>{
            this.soccerGames.push(new SoccerGame(reg))
          })
        })
      },
      deleteSoccerGame(soccerGame){
        soccerGame.Delete(()=>{
          this.$store.commit('openSnackBar', {
            color:'success',
            message: 'Registro eliminado correctamente'
          })
          this.getSoccerGames()
        })
      }
    }
  }
</script>
