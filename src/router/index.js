import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignIn from '../views/SignIn.vue'
import About from '../views/About.vue'
import Dashboard from '../views/Dashboard.vue'
import store from "../store"
const isAuthenticated = () => {
  const token = store.state.user.token;
  if (token) {
    return true
  }
  return false
}


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,

  },
  {
    path: '/about',
    name: 'About',
    component: About,
 
  },
  {
    path: '/login',
    name: 'SignIn',
    component: SignIn,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: true
  },
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) {
        next()
      } else {
        next('/login')
      }
    }
},
  // {
  //   path: '/#signin',
  //   name: 'LoginModal',
  //   component: LoginModal,
  //   props: {dialog: true}
  // },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name == 'Dashboard' && !isAuthenticated) next({ name: 'Home' })
  else next()
})

Vue.use(VueRouter)


export default router
