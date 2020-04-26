import Vue from 'vue'
import store from '../store/index'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login"
import policy from "./policy"
import team from "./team"
import soccerGame from "./soccerGame"
import firebase from "firebase/app"

Vue.use(VueRouter)

const routes = [
  ...policy,
  ...team,
  ...soccerGame,
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/logout',
    name: 'logout',
    beforeEnter: (to, from, next) => {
      store.commit('logout')
      next()
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let user = firebase.auth().currentUser
  let requireAuth = to.matched.some(record => record.meta.requireAuthenticated)
  if (requireAuth && !user) next('/login')
  //else if (!requireAuth && user) next('/home')
  else next()

})

export default router
