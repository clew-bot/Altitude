import actions from './actions.js'
import mutations from './mutations.js'
import getters from './getters.js'

const state = {
    allPosts: [],
    createdAtTimes: [],
    dashboardLoading: false,
    chatRerender: 0,
    postComments: [],
    commentsRender: 0,
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}