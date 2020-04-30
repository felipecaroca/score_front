<template>
  <v-container>
    <score-result :soccerGameId="soccerGameId" />
    <v-row>
      <v-col align="center">
        <return-button path="/soccer_games">
          Volver a Partidos
        </return-button>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data:()=>({
      soccerGameId: null
    }),
    created() {
      if(this.$route.params.id)
        this.soccerGameId = this.$route.params.id
    }
  }
</script>