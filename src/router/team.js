import Teams from "../views/team/Teams"
import Edit from "../views/team/Edit"
export default [
  {
    path: '/teams',
    name: 'teams',
    component: Teams
  },
  {
   path: '/teams/edit/:id',
   name: 'editTeam',
   component: Edit
  }
]