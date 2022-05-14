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

}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}