<template>
  <v-btn color="warning"
         :to="path"
  >
    <v-icon>mdi-undo</v-icon>
    <slot></slot>
  </v-btn>
</template>

<script>
  export default {
    props: ['path']
  }
</script>