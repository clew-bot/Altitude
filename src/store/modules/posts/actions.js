import {SAVE_POST, GET_POSTS } from './types.js'

export default {
  async [SAVE_POST]({ commit, state }, post) {
    console.log(commit, state)
    const response = await fetch(`/api/savePost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ post }),
    });
    const data = await response.json();
    console.log(data);
  },
  async [GET_POSTS]({ commit }) {
    const response = await fetch(`/api/allPosts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    // commit("setCreatedAtTimes", data);
    commit("setAllPosts", data);
    // console.log("DATA", data);
  }
}