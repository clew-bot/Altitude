import Vue from "vue"
import Vuex from "vuex"

// Modules import
import modal from "./modules/modal"
import user from "./modules/user";
import profile from "./modules/profile";
import posts from "./modules/posts";
import messages from "./modules/messages";
Vue.use(Vuex)

const modules = {
  modal,
  user,
  profile,
  posts,
  messages,
}
export default new Vuex.Store({
  modules
})