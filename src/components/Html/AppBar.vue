<template>
  <div>
    <v-app-bar
        app
        color="success"
        dark
    >

      <v-list class="transparent" v-if="user.uid">
        <v-list-item @click="drawer = true">
          <v-list-item-avatar v-if="user.photoURL">
            <v-img :src="user.photoURL" />
          </v-list-item-avatar>
          <v-icon>mdi-menu</v-icon>
        </v-list-item>
      </v-list>
      <v-list class="transparent">
        <v-list-item to="/">
          <v-icon>mdi-home</v-icon>
        </v-list-item>
      </v-list>
      <v-list class="transparent" v-if="user.uid">
        <v-list-item to="/help">
          <v-icon>mdi-help-circle</v-icon>
        </v-list-item>
      </v-list>
      <v-list class="transparent">
        <v-list-item to="/about">
          <v-icon>mdi-information</v-icon>
        </v-list-item>
      </v-list>
      <v-spacer></v-spacer>
      <div class="d-flex align-center">
        <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            :src="logo"
            transition="scale-transition"
            width="60"
        />
      </div>


      <v-btn
          to="/login"
          color="green darken-2"
          v-if="!user.displayName"
      >
        <span class="mr-2">Iniciar Sesión</span>
        <v-icon>mdi-login</v-icon>
      </v-btn>

    </v-app-bar>
    <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
        dark
        color="green lighten-1"
    >
      <v-list-item>
        <v-list-item-avatar>
          <v-img :src="user.photoURL"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{user.displayName}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>

        <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            :to="item.to"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>

</template>

<script>
  import logo from '../../assets/logo_score_white.png'
  export default {
    data:()=>({
      logo,
      drawer: false,
      items:[
        {icon: 'mdi-home', title: 'Inicio', to: '/'},
        {icon: 'mdi-shield-account', title: 'Equipos', to: '/teams'},
        {icon: 'mdi-soccer-field', title: 'Partidos', to: '/soccer_games'},
        {icon: 'mdi-logout', title: 'Cerrar Sesión', to: '/logout'},

      ]
    }),
    computed:{
      user() {
        return this.$store.getters.getUser
      },
    }
  }
</script>
