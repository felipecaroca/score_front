<template>
  <v-dialog
      v-model="dialog"
      width="500"
  >
    <template  v-slot:activator="{ on }">
      <v-btn :color="color"
             :fab="fab"
             :small="small"
             class="ma-1"
             v-on="on"
      >
        <v-icon v-if="icon">{{icon}}</v-icon>
        {{btnText}}
      </v-btn>
    </template>

    <v-card>
      <v-card-title
          class="headline error lighten-1 white--text"
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
            color="success"
            @click="acceptButton"
        >
          <slot name="acceptBtn"></slot>
        </v-btn>
        <v-btn
            color="error"
            @click="dialog = false"
        >
          Cerrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props:['fab', 'small', 'color','icon','btnText'],
    data:()=>({
      dialog: false
    }),
    methods:{
      acceptButton(){
        this.$emit('onAccept')
      }
    }
  }
</script>