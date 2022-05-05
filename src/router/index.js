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
  const data = await res.json()
  console.log("DATA = ", data)
  if (data.auth) {
    console.log("it's true")
    return true
  } else {
    console.log("It's false")
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

// router.beforeEach((to, from, next) => {
//   if (to.name == 'Dashboard' && !isAuthenticated) next({ name: 'Home' })
//   else next()
// })

Vue.use(VueRouter)


export default router
