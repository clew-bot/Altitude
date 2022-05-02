import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignIn from '../views/SignIn.vue'
import About from '../views/About.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
 
    // props: { id: "scrolling-techniques-3" }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    children: [
      {
        path: ':signin',
      }
    ]
    // props: { id: "scrolling-techniques-3" }
  },
  {
    path: '/login',
    name: 'SignIn',
    component: SignIn,
    // props: { id: "scrolling-techniques-3" }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
