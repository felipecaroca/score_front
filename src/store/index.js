import Vue from 'vue'
import Vuex from 'vuex'
import {snackbar} from "./snackbar"
import {loading} from "./loading"
import {auth} from './auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    snackbar,
    loading,
    auth
  }
})
