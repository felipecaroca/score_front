<template>
  <div class="home">
    <v-row v-if="user.uid">
      <v-col align="center" lg="2" md="3" sm="4">
        <v-btn class="elevation-3 ma-3 pa-6"
               large
               to="/teams"
               block
        >
          <v-icon>mdi-shield-account</v-icon>
          Equipos
        </v-btn>
        <v-btn class="elevation-3 ma-3 pa-6"
               large
               to="/soccer_games"
               block
        >
          <v-icon>mdi-soccer-field</v-icon>
          Partidos
        </v-btn>
        <v-btn class="elevation-3 ma-3 pa-6"
               large
               block
               to="/logout"
        >
          <v-icon>mdi-logout</v-icon>
          Salir
        </v-btn>
      </v-col>
      <v-col>
        <v-card>
          <v-card-text>
            <v-card-title>Últimos Resultados</v-card-title>
            <last-result />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col>
        <presentation />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Presentation from "./Presentation"

export default {
  computed:{
    user(){
      return this.$store.getters.getUser
    }
  },
  components:{
    Presentation
  }
}
</script>
