import actions from './actions.js'
import mutations from './mutations.js'
import getters from './getters.js'

const state = {
    hello: 'Hello World',
    dialog: true,
    dialog2: true,
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}