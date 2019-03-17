import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import "@assets/styles/common.less"
import 'vant/lib/index.css'
import VueCookie from 'vue-cookie'
import request from './utils/request'
import http from './utils/http'
import helper from './utils/helper'

Vue.use(VueCookie)

Vue.config.productionTip = false

Vue.prototype.$request = request
Vue.prototype.$http = http
Vue.prototype.$helper = helper

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
