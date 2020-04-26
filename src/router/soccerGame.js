import List from "../views/soccerGame/List"
import Create from "../views/soccerGame/Create"

export default [
  {
    path: '/soccer_games',
    name: 'soccer_games',
    component: List
  },
  {
    path: '/soccer_games/new',
    name: 'newSoccerGame',
    component: Create
  }
]