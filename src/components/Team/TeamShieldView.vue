<template>
  <v-row>
    <v-col align="center">
      <v-img :src="team.logo" :width="width" />
      {{team.name}}
    </v-col>

  </v-row>
</template>

<script>
  export default {
    props:['team','width']
  }
</script>