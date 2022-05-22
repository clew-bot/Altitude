import {
  FETCH_PROFILE_DATA,
  SET_USER_LOCATION,
  CHANGE_DIALOG,
  LOGIN_USER,
  LOGOUT_USER,
  RESET_BACKGROUND,
} from "./types.js";

export default {
  [LOGIN_USER]({ commit }, payload) {
    commit("isLoggedIn", payload);
  },
  [LOGOUT_USER]({ commit }, payload) {
    commit("logOut", payload);
  },
  [SET_USER_LOCATION]() {},
  [CHANGE_DIALOG]({ commit }, payload) {
    commit("changeDialog", payload);
  },
  async [FETCH_PROFILE_DATA]({ commit, state }, query) {
    try {
      const response = await fetch(`/api/profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      const { findUser, randomUsers, message } = await response.json();
      console.log(findUser);
      commit("setNoUsername", false);
      if (message) {
        commit("setNoUsername", true);
      }
      if (findUser.profilePic) {
        commit("setIsThereImages", true);
      } else {
        commit("setIsThereImages", false);
      }
      commit("setFindUser", findUser);
      commit("setRandomUsers", randomUsers);
      commit("setLastLogin", findUser.updatedAt);
      commit("setCreatedAt", findUser.createdAt);
      if (findUser.backgroundColor) {
        commit("setBackgroundColor", findUser.backgroundColor);
      }
    } catch (error) {
      state.noUsername = true;
      console.log("Error: ", error);
    }
  },
  [RESET_BACKGROUND]({ commit }) {
    commit("setBackgroundColor", null);
    console.log(this.state.backgroundColor);
  }
};
