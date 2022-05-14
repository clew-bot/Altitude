import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import store from "./store"
import VueFormulate from '@braid/vue-formulate'
import Toasted from 'vue-toasted';


Vue.use(Toasted)
Vue.use(VueFormulate, {
  uploader: async function (file, progress, error) {
    try {
      const formData = new FormData()
      console.log("DO you see me??")
      formData.append('image', file)
      const result = await fetch("/api/uploadprofilepic", {
        method: 'POST',
        body: formData
      })
       progress(100)// (native fetch doesn’t support progress updates)
      const data = await result.json()
      console.log(data)

    } catch (err) {
      error('Unable to upload file')
    }
  }
})
Vue.config.productionTip = false

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
