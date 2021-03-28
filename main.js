import Vue from 'vue'
import App from './App'

import home from './pages/home/home.vue'
Vue.component('home',home)

import mine from './pages/mine/mine.vue'
Vue.component('mine',mine)

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

import http from './common/httpRequest'
Vue.prototype.http = http

import guid from './libs/function/guid.js'
Vue.prototype.guid = guid

import $parent from './libs/function/$parent.js'
Vue.prototype.$parent = $parent

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
