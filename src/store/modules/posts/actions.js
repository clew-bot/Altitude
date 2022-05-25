/* eslint-disable no-unused-vars */
import {GET_COMMENTS, SAVE_POST, GET_POSTS, CHAT_RERENDER, ADD_COMMENT, RERENDER_POSTCOMMENTS } from './types.js'

export default {
  async [SAVE_POST]({ commit, state }, post) {
    // console.log(commit, state)
    const response = await fetch(`/api/savePost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({ post }),
    });
    // eslint-disable-next-line no-unused-vars
    const data = await response.json();

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
  },
  [CHAT_RERENDER]({ commit }) {
    commit("setChatRerender");
  },
  async [ADD_COMMENT]({ commit, state }, comment) {
    try {
      const response = await fetch("/api/addComment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment }),
      });
      // eslint-disable-next-line no-unused-vars
      const data = await response.json();
  } catch (error) {
      console.log(error);
    }
  },
  async [GET_COMMENTS]({ commit }, post) {
      try {
        const response = await fetch(`/api/getComments`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ post }),
        });
        const data = await response.json();
        commit("setComments", data[0].comments);
        commit("setCreatedAtTimes", data[0].createdAt);
      } catch (error) {
        console.log(error);
      }
  },
  [RERENDER_POSTCOMMENTS]({ commit }) {
    commit("rerenderComments");
  }

}