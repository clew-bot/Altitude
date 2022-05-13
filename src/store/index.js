import Vue from "vue"
import Vuex from "vuex"

// Modules import
import modal from "./modules/modal"
import user from "./modules/user";
import profile from "./modules/profile";

Vue.use(Vuex)

// const state = {}
// const actions = ({})
// const mutations = ({})
// const getters = ({})

const modules = {
  modal,
  user,
  profile
}

export default new Vuex.Store({
  modules
})