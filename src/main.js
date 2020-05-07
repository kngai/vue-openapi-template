import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

require('html5-boilerplate/dist/css/normalize.css')
require('html5-boilerplate/dist/css/main.css')

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
