import Vue from 'vue'
// fontawesome 图标
import '@fortawesome/fontawesome-free/css/all.css'
import './cube-ui'
import './echarts'
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
