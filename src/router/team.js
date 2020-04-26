import Teams from "../views/team/Teams"
import Edit from "../views/team/Edit"
export default [
  {
    path: '/teams',
    name: 'teams',
    component: Teams,
    meta: {
      requireAuthenticated: true
    }
  },
  {
   path: '/teams/edit/:id',
   name: 'editTeam',
   component: Edit,
    meta: {
      requireAuthenticated: true
    }
  }
]