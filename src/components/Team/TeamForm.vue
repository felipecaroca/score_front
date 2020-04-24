<template>
  <v-form v-model="formValid" @submit.prevent="addTeam" align="center" ref="teamForm">
    <v-row >
      <v-col cols="12" align="center" justify="center">
        <v-img :src="team.logo" width="100" class="ma-3"/>
      </v-col>
    </v-row>
    <v-text-field label="Nombre"
                  :rules="nameRules"
                  required
                  class="ma-1"
                  v-model="team.name"
    />
    <v-file-input label="Escudo"
                  :multiple="false"
                  :show-size="true"
                  :counter="true"
                  class="ma-1"
                  v-model="logo"
    />
    <v-btn block color="success" class="ma-1" @click="addTeam">
      <v-icon>mdi-plus</v-icon>
      Agregar
    </v-btn>
  </v-form>
</template>

<script>
  import {Team} from "../../Models/Team"
  import firebase from 'firebase/app'

  export default {
    data: ()=>({
      team: new Team(),
      logo: null,
      formValid: false,
      nameRules: [
        v => !!v || 'el nombre es requerido'
      ]
    }),
    watch:{
      logo: function(){
        if (this.logo && this.logo.length > 0){
          this.toBase64(this.logo[0]).then((res)=>{
            this.team.logo = res
          })
        }else{
          this.team.logo = new Team().logo
        }
      }
    },
    methods:{
      addTeam(){
        if (this.$refs.teamForm.validate()){

          this.$store.commit('setLoading', true)
          let self = this
          let addTeam = firebase.functions().httpsCallable('postTeam')
          addTeam(self.team).then(()=>{
            self.$store.commit('openSnackBar',{
              color: 'success',
              message: 'Equipo creado exitosamente'
            })
            this.$refs.teamForm.reset()
            this.$emit('created')
            this.team = new Team()
          }).catch((err)=>{
            self.$store.commit('openSnackBar', {
              color: 'error',
              message: err
            })
          }).finally(()=> self.$store.commit('setLoading', false))
        }
      },
      toBase64(file){
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      }
    }
  }
</script>