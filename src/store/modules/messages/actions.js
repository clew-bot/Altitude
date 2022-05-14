import { SEND_MESSAGE, GET_MESSAGES, GET_PRIVATE_MESSAGE } from "./types.js";

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
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  },
  async [GET_PRIVATE_MESSAGE]({ commit }, name) {
    console.log(commit)
    try {
      const messages = await fetch(`/api/getPrivateMessages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      const data = await messages.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  },
};
