import Vue from 'vue'
import App from './App'
import Router from './common/lib/Router.js'
import Storage from "./common/lib/Storage.js"

Vue.config.productionTip = false

App.mpType = 'app'

const router = new Router({
	pageLimit: 10
})

Vue.prototype.$router = router
Vue.prototype.$storage = Storage

const app = new Vue({
	...App
})
app.$mount()
