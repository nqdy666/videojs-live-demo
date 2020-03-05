import './amfe-flexible'
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vve-vue-axios'
// fontawesome 图标
import '@fortawesome/fontawesome-free/css/all.css'
// import './cube-ui'
// import './echarts'
import './assets/app.scss'
import App from './App.vue'
import router from './router'
import store from './store'

import VueVideoPlayer from 'vue-video-player/src'
import 'videojs-contrib-hls'
import 'videojs-flash'
import 'videojs-flvjs-es6'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
Vue.use(VueVideoPlayer, /* {
  options: global default options,
  events: global videojs events
} */)

Vue.config.productionTip = false

Vue.use(VueAxios, axios)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
