import { SET_USER_LOCATION, CHANGE_DIALOG, LOGIN_USER} from './types.js'

export default {
  [LOGIN_USER]({commit}, payload) {
    commit("isLoggedIn", payload)
  },
  [SET_USER_LOCATION]() {},
  [CHANGE_DIALOG]({commit}, payload) {
    commit('changeDialog', payload);
  }
}