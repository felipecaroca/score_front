<template>
  <div class="home">
    <v-row v-if="user.uid">
      <v-col align="center">
        <v-btn class="elevation-3 ma-3 pa-6"
               large
               to="/teams"
        >
          <v-icon>mdi-shield-account</v-icon>
          Equipos
        </v-btn>
        <v-btn class="elevation-3 ma-3 pa-6"
               large
               to="/teams"
        >
          <v-icon>mdi-soccer-field</v-icon>
          Partidos
        </v-btn>
        <v-btn class="elevation-3 ma-3 pa-6"
               large
               to="/teams"
        >
          <v-icon>mdi-logout</v-icon>
          Salir
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col>

      </v-col>
    </v-row>
  </div>
</template>

<script>

export default {
  computed:{
    user(){
      return this.$store.getters.getUser
    }
  }
}
</script>
