import Vue from "vue"
import Vuex from "vuex"

// Modules import
import modal from "./modules/modal"
import user from "./modules/user";
import profile from "./modules/profile";
import posts from "./modules/posts";

Vue.use(Vuex)

// const state = {}
// const actions = ({})
// const mutations = ({})
// const getters = ({})

const modules = {
  modal,
  user,
  profile,
  posts
}
export default new Vuex.Store({
  modules
})