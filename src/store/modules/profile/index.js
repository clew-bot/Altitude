import actions from './actions.js'
import mutations from './mutations.js'
import getters from './getters.js'

const state = {
    user: null,
    token: null,
    loggedIn: null,
    username: "",
    findUser: [],
    query: "",
    lastLogin: "",
    createdAt: "",
    otherUsers: [],
    timeLastLogin: "",
    timeCreated: "",
    loading: true,
    isThereImages: false,
    loadingImage: true,
    noUsername: false,

}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}