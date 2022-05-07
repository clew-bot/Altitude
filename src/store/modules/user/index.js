import actions from './actions.js'
import mutations from './mutations.js'
import getters from './getters.js'

const state = {
    user: null,
    token: null,
    loggedIn: null,
    username: "",
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}