import List from "../views/soccerGame/List"
import Create from "../views/soccerGame/Create"
import Formation from "../views/soccerGame/Formation"
import Score from "../views/soccerGame/Score"
import Edit from "../views/soccerGame/Edit"

export default [
  {
    path: '/soccer_games',
    name: 'soccer_games',
    component: List,
    meta: {
      requireAuthenticated: true
    }
  },
  {
    path: '/soccer_games/new',
    name: 'newSoccerGame',
    component: Create,
    meta: {
      requireAuthenticated: true
    }
  },
  {
    path: '/soccer_games/edit/:id',
    name: 'SoccerGameEdit',
    component: Edit,
    meta: {
      requireAuthenticated: true
    }
  },
  {
    path: '/soccer_games/:id/formation',
    name: 'SoccerGameFormation',
    component: Formation,
    meta: {
      requireAuthenticated: true
    }
  },
  {
    path: '/soccer_games/:id/score',
    name: 'SoccerGameScore',
    component: Score,
    meta: {
      requireAuthenticated: true
    }
  }
]