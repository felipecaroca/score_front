import Vue from 'vue'

Vue.component('team-shield-view', require('../components/Team/TeamShieldView').default)
Vue.component('score-view', require('../components/SoccerGame/ScoreViewer').default)
Vue.component('time-view', require('../components/SoccerGame/TimeViewer').default)
Vue.component('score-result', require('../components/SoccerGame/SoccerGameResult').default)
Vue.component('last-result', require('../components/SoccerGame/LastResult').default)