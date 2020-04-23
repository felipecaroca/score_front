import privacy from "../views/policy/privacy"
import service from "../views/policy/service"

export default [
  {
    path: '/privacy',
    name: 'privacy',
    component: privacy
  },
  {
    path: '/service',
    name: 'service',
    component: service
  }
]