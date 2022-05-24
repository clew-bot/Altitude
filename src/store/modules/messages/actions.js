import { SEND_MESSAGE, GET_MESSAGES, GET_PRIVATE_MESSAGE, GET_LIKED_USERS, REMOVE_LIKED_USER, REFRESH_MESSAGES } from "./types.js";

export default {
  async [SEND_MESSAGE]({ commit, state }, message) {
    console.log(commit, state);
    console.log(message);
    const response = await fetch(`/api/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });
    const data = await response.json();
    console.log(data);
  },
  async [GET_MESSAGES]({ commit }) {
    try {
      const messages = await fetch(`/api/getMessages`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await messages.json();
      
      commit("setMessages", data);
     
      commit("setUsernames", data);
    } catch (error) {
      console.log(error);
    }
  },
  async [GET_PRIVATE_MESSAGE]({ commit }, name) {
    try {
      const messages = await fetch(`/api/getPrivateMessages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      const data = await messages.json();
      const msgs = ([...data.toMessages, ...data.fromMessages])
      commit("setMessages", msgs);
    } catch (error) {
      console.log(error);
    }
  },

  async [GET_LIKED_USERS]({ commit }) {
    try {
      const response = await fetch("/api/getLikedUsers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });
      const data = await response.json();
      console.log(data)
      commit("setLikedUsers", data.likedUsers);
      commit("setLikedMe", data.likedMe);
    }
    catch (error) {
      console.log("Something went wrong", error);
    }
  },
  async [REMOVE_LIKED_USER]({ commit }, id) {
    console.log(commit, id)
    try {
      const response = await fetch("/api/removeLikedUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id })
      });
      const data = await response.json();
      console.log(data)
    }
    catch (error) {
      console.log("Something went wrong", error);
    }
    },
  async [REFRESH_MESSAGES]({ commit }) {
    commit("setRefreshMessages");
  }
}
