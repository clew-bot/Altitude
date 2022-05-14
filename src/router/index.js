import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignIn from '../views/SignIn.vue'
import Dashboard from '../views/Dashboard.vue'
import Post from '../views/Post.vue'
import store from "../store"
import PageNotFound from '../views/PageNotFound.vue'
import Journal from '../views/Journal.vue'
import Profile from '../views/Profile.vue'
import EditProfile from '../views/EditProfile.vue'
import Reddit from "../views/Reddit.vue"
import Messages from "../views/Messages.vue"
import PrivateMessage from "../views/PrivateMessage.vue"

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
  store.dispatch("user/LOGOUT_USER");
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
        next('/#signin')
      }
    }
  },
  {
    path: "/journal",
    name: "Journal",
    component: Journal,
    beforeEnter: async (to, from, next) => {  
      if (await isAuthenticated() === true) {
        next()
      } else if (await isAuthenticated() === false) {
        next('/#signin')
      }
    }
  },
  {
    path: "/profile/:id",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/edit",
    name: "EditProfile",
    component: EditProfile,
    beforeEnter: async (to, from, next) => {  
      if (await isAuthenticated() === true) {
        next()
      } else if (await isAuthenticated() === false) {
        next('/#signin')
      }
    }
  },
  {
    path: "/reddit",
    name: "Reddit",
    component: Reddit,
    beforeEnter: async (to, from, next) => {  
      if (await isAuthenticated() === true) {
        next()
      } else if (await isAuthenticated() === false) {
        next('/#signin')
      }
    }
  },
{
  path: "/post/:id",
  name: "Post",
  component: Post,
},
{ path: "*", component: PageNotFound },
{
  path: "/messages",
  name: "Messages",
  component: Messages,
  beforeEnter: async (to, from, next) => {  
    if (await isAuthenticated() === true) {
      next()
    } else if (await isAuthenticated() === false) {
      next('/#signin')
    }
  }
},
{
  path: "/pm/:id",
  name: "PrivateMessage",
  component: PrivateMessage,
},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

Vue.use(VueRouter)

export default router
