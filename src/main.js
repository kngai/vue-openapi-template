import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'leaflet/dist/leaflet.css'

require('skeleton-css/css/normalize.css')
require('skeleton-css/css/skeleton.css')

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
