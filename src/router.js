import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import AliyunPlayerDemo from './views/AliyunPlayerDemo'
import ChimeeDemo from './views/ChimeeDemo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/aliyun-player',
      name: 'aliyun-player',
      component: AliyunPlayerDemo
    }, {
      path: '/chimee-player',
      name: 'chimee-player',
      component: ChimeeDemo
    }
  ]
})
