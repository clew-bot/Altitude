import Vue from 'vue'
import Vuex from 'vuex'

// Modules import
import modalModule from './modules/modal'

Vue.use(Vuex)

// const state = {}
// const actions = ({})
// const mutations = ({})
// const getters = ({})

const modules = {
  modalModule
}

export default new Vuex.Store({
  modules
})