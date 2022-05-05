import { SET_USER, SET_USER_LOCATION, CHANGE_DIALOG} from './types.js'

export default {
  [SET_USER]() {
    console.log("Hello from SET_USER action");
  },
  [SET_USER_LOCATION]() {},
  [CHANGE_DIALOG]({commit}, payload) {
    commit('changeDialog', payload);
  }
}