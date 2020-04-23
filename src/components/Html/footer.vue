<template>
  <v-footer
      color="green  lighten-2"
      padless

  >
    <v-row
        justify="center"
        no-gutters
    >
      <v-col
          class="green lighten-1 py-4 text-center text--disabled"
          cols="12"
      >
        <div class="white--text">
          {{ new Date().getFullYear() }} — <strong>Score</strong>
        </div>
        <router-link to="/privacy" class="white--text">Politica de Privacidad</router-link> |
        <router-link to="/service" class="white--text">Condiciones del Servicio</router-link>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
  export default {
  }
</script>
