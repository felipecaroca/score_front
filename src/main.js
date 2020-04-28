import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import 'firebaseui/dist/firebaseui.css'


import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/functions'
import 'firebase/firestore'
import 'firebase/analytics'

import './Imports/html'
import './Imports/forms'
import './Imports/viewer'

Vue.config.productionTip = false

var firebaseConfig = {
  apiKey: "AIzaSyCdayd_AYY7DJw7sRJEMlDPKxSdG6vv8ew",
  authDomain: "score-a13d8.firebaseapp.com",
  databaseURL: "https://score-a13d8.firebaseio.com",
  projectId: "score-a13d8",
  storageBucket: "score-a13d8.appspot.com",
  messagingSenderId: "456577349189",
  appId: "1:456577349189:web:dd122fd94225f5951dd52c",
  measurementId: "G-BP3LJB9TJ3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

firebase.auth().onAuthStateChanged(function(){
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount('#app')
})
