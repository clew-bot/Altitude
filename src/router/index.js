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

export default router
