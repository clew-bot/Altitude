import actions from './actions.js'
import mutations from './mutations.js'
import getters from './getters.js'

const state = {
    totalUnreadMessages: [],
    totalMessages: [],
    totalReadMessages: [],
    createdAtTimes: [],
    usernames: [],
    toMessages: [],
    fromMessages: [],
    likedUsers: [],
    refreshMessages: 0,
    likedMe: [],

}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}