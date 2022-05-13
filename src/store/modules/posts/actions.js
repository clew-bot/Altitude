import {SAVE_POST } from './types.js'

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
  }
}