<template>
  <v-form ref="editPlayerForm" @submit.prevent="editPlayer" v-model="editPlayerValid">
    <v-card>
      <v-card-title>Editar Jugador</v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <v-text-field v-model="player.name"  label="Nombre..."/>
            <v-text-field v-model="player.lastName" lanel="Apellidos..."  />
            <v-text-field v-model="player.mail"  label="Correo..." />

            <v-autocomplete v-model="player.teamId"
                            :items="teams"
                            item-text="name"
                            item-value="id"
                            label="Equipo"

            />
          </v-col>
          <v-col align="center">
            <v-img :src="player.photo?player.photo:noImage" width="262" />
            <v-file-input label="Foto Jugador" v-model="photo"
                          :multiple="false"
                          :show-size="true"
                          :counter="true"
                          class="ma-1"
            />
          </v-col>
        </v-row>

      </v-card-text>
      <v-card-actions>
        <v-row>
          <v-col align="center">
            <return-button :path="'/teams/edit/'+teamId">
              Volver a Equipo
            </return-button>
            <v-btn color="success"
                   @click="editPlayer"
            >
              <v-icon>mdi-floppy</v-icon>
              Guardar
            </v-btn>
          </v-col>
        </v-row>

      </v-card-actions>
    </v-card>

  </v-form>
</template>

<script>
  import {Team} from "../../Models/Team"
  import {Player} from "../../Models/Player"
  import noImage from '../../assets/noimage.png'
  import {FileHelper} from "../../Helpers/fileHelper"

  export default {
    props: ['teamId', 'playerId'],
    data: () => ({
      editPlayerValid: false,
      player: new Player(),
      teams: [],
      noImage,
      photo: null
    }),
    created() {
      this.getTeams()
    },
    watch: {
      photo: function(){
        if (this.photo && this.photo.length > 0){
          FileHelper.toBase64(this.photo[0]).then(res=>{
            this.player.photo = res
          })
        }else{
          this.player.photo = null
          this.photo = noImage
        }
      }
    },
    methods: {
      getPlayer(){
        Player.Get(this.playerId, (res)=>{
          this.player = new Player(res.data)
        })
      },
      editPlayer() {
        this.player.Update(()=>{
          this.$store.commit('openSnackBar', {
            color: 'success',
            message: 'Jugador Actualizado exitosamente'
          })
        })
      },
      getTeams(){
        Team.List({}, (res)=>{
          this.teams = []
          res.data.forEach(reg=>{
            this.teams.push(new Team(reg))
          })
        },()=>{
          if(this.playerId)
            this.getPlayer()
        })
      }
    }
  }
</script>