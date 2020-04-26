import Teams from "../views/team/Teams"
import Edit from "../views/team/Edit"
import EditPlayer from "../views/team/EditPlayer"

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
  },
  {
    path: '/teams/edit/:teamId/player/edit/:id',
    name: 'editPlayer',
    component: EditPlayer,
    meta: {
      requireAuthenticated: true
    }
  }
]