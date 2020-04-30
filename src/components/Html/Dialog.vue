<template>
  <v-dialog
      v-model="visible"
      width="500"
  >
    <template v-slot:activator="{ on }">
      <v-btn
          :color="btnColor"
          dark
          :small="small"
          v-on="on"
      >
        <slot name="btnText"></slot>
      </v-btn>
    </template>

    <v-card>
      <v-card-title
          class="headline success lighten-1 white--text"
          primary-title
      >
        <slot name="title"></slot>
      </v-card-title>

      <v-card-text>
        <slot></slot>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="error"
            text
            @click="visible = false"
        >
          Cerrar
        </v-btn>

      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props:['btnColor','small'],
    data:()=>({
      visible: false
    })
  }
</script>