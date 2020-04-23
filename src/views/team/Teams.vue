<template>
  <v-container>
    <simple-table :headers="['Nombre', 'Logo', 'Opciones']">
      <tr v-for="team in teams" :key="team.id">
        <td>{{team.name}}</td>
        <td>
          <v-img :src="team.logo" />
        </td>
        <td>
          <v-btn color="info"
                 fab
                 small
                 class="ma-1"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>

        </td>
      </tr>
    </simple-table>
  </v-container>
</template>

<script>
  import firebase from 'firebase/app'
  export default {
    data:()=>({
      teams: []
    }),
    created() {
      let self = this
      firebase.auth().onAuthStateChanged(function(){
        self.$store.commit('setLoading', true)
        let teams = firebase.functions().httpsCallable('getTeams')
        teams().then((res) => {
          console.log(res)
        }).catch(err => {
          self.$store.commit('openSnackBar', {
            color: 'error',
            message: err
          })
        }).finally(() => {
          self.$store.commit('setLoading', false)
        })
      })
    }
  }
</script>