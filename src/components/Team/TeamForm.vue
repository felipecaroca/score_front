<template>
  <v-form v-model="formValid" @submit.prevent="saveTeam" align="center" ref="teamForm">
    <v-row>
      <v-col cols="12" align="center" justify="center">
        <v-img :src="team.logo" width="100" class="ma-3"/>
      </v-col>
    </v-row>
    <v-text-field label="Nombre Equipo"
                  :rules="nameRules"
                  required
                  class="ma-1"
                  v-model="team.name"
    />
    <v-file-input label="Escudo Equipo"
                  :multiple="false"
                  :show-size="true"
                  :counter="true"
                  class="ma-1"
                  v-model="logo"
    />
    <v-btn block color="success" class="ma-1" @click="saveTeam">
      <v-icon>{{teamId?'mdi-floppy':'mdi-plus'}}</v-icon>
      {{teamId?'Guardar':'Agregar'}}
    </v-btn>
  </v-form>
</template>

<script>
  import {Team} from "../../Models/Team"
  import {FileHelper} from "../../Helpers/fileHelper"

  export default {
    props: ['teamId'],
    data: () => ({
      team: new Team(),
      self: null,
      logo: null,
      formValid: false,
      nameRules: [
        v => !!v || 'el nombre es requerido'
      ]
    }),
    created() {
      this.self = this
      if (this.teamId) {
        this.getTeam(this.teamId)
      }
    },
    watch: {
      logo: function () {
        if (this.logo && this.logo.length > 0) {
          FileHelper.toBase64(this.logo[0]).then((res) => {
            this.team.logo = res
          })
        } else {
          this.team.logo = new Team().logo
        }
      }
    },
    methods: {
      saveTeam() {
        if (this.$refs.teamForm.validate()) {
          if (this.teamId) {
            this.updateTeam()
          } else
            this.addTeam()
        }
      },
      getTeam(id) {
        Team.Get(id, res => {
          this.self.team = new Team(res.data)
        })
      },
      addTeam() {
        this.team.Post(() => {
          this.self.$store.commit('openSnackBar', {
            color: 'success',
            message: 'Equipo creado exitosamente'
          })
          this.$emit('created')
          this.team = new Team()
          this.logo = null
          this.$refs.teamForm.reset()
        })
      },
      updateTeam() {
        this.team.Update(()=>{
          this.self.$store.commit('openSnackBar', {
            color: 'success',
            message: 'Equipo actualizado exitosamente'
          })
        })
      }
    }
  }
</script>