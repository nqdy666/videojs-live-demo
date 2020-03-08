// import 'core-js/stable';
// import 'regenerator-runtime/runtime';
import 'babel-polyfill'
import Vue from 'vue'
import './assets/app.scss'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
