import { FETCH_PROFILE_DATA, SET_USER_LOCATION, CHANGE_DIALOG, LOGIN_USER, LOGOUT_USER } from './types.js'

export default {
  [LOGIN_USER]({commit}, payload) {
    commit("isLoggedIn", payload)
  },
  [LOGOUT_USER]({commit}, payload) {
    commit("logOut", payload)
  },
  [SET_USER_LOCATION]() {},
  [CHANGE_DIALOG]({commit}, payload) {
    commit('changeDialog', payload);
  },
  async [FETCH_PROFILE_DATA]({commit, state}, query) {
    try {
      const response = await fetch(`/api/profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      const {findUser , randomUsers} = await response.json();

      if (findUser.profilePic) {
        state.isThereImages = true;
        console.log(state.isThereImages)
      } else {
        state.isThereImages = false;
      }
      if(!findUser.username) {
        return state.noUsername = true
      }
      console.log(randomUsers);
      commit("setFindUser", findUser);
      commit("setRandomUsers", randomUsers);
      commit("setLastLogin", findUser.lastLogin);
      commit("setCreatedAt", findUser.createdAt);
    } catch (error) {
      state.noUsername = true
      throw "No Username Found";
    }
  }

}