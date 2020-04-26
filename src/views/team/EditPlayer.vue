<template>
  <v-container>
    <edit-player-form :teamId="teamId" :playerId="playerId" />
  </v-container>
</template>

<script>
  export default {
    data:()=>({
      teamId: null,
      playerId: null
    }),
    created() {
      if(this.$route.params.teamId)
        this.teamId = this.$route.params.teamId
      if (this.$route.params.id)
        this.playerId = this.$route.params.id
    }
  }
</script>