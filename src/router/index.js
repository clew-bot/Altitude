import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignIn from '../views/SignIn.vue'
import About from '../views/About.vue'
import Dashboard from '../views/Dashboard.vue'
// import store from "../store"


const isAuthenticated = async () => {
  try {
  const res = await fetch("/api/auth/check", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
  })
  const { auth } = await res.json()
  if (auth) {
    return true
  } else {
    return false
  }
} catch(err) {
  console.log("Not authenticated ", err);
  return false
}
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
    beforeEnter: async (to, from, next) => {  
      if (await isAuthenticated() === true) {
        next()
      } else if (await isAuthenticated() === false) {
        next('/login')
      }
    }
},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

Vue.use(VueRouter)

export default router
