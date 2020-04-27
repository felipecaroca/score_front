<template>
  <v-container>
    <v-row>
      <v-col align="center">
        <soccer-game-form :soccerGameId="soccerGameId" />
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
