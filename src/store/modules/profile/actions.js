import {
  FETCH_PROFILE_DATA,
  SET_USER_LOCATION,
  CHANGE_DIALOG,
  LOGIN_USER,
  LOGOUT_USER,
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
      commit("setNoUsername", false);
      if (message) {
        commit("setNoUsername", true);
      }
      if (findUser.profilePic) {
        commit("setIsThereImages", true);
        console.log("There is image", state.isThereImages);
      } else {
        commit("setIsThereImages", false);
        console.log("There is no image", state.isThereImages);
      }
      console.log("FIne", findUser);
      console.log(randomUsers);
      commit("setFindUser", findUser);
      commit("setRandomUsers", randomUsers);
      commit("setLastLogin", findUser.updatedAt);
      commit("setCreatedAt", findUser.createdAt);
      commit("setLoading", false);
    } catch (error) {
      state.noUsername = true;
      console.log("Error: ", error);
    }
  },
};
