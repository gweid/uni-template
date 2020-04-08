import Vue from 'vue'
import App from './App'
import Router from './common/lib/Router.js'

Vue.config.productionTip = false

App.mpType = 'app'

const router = new Router({
	pageLimit: 10
})

Vue.prototype.$router = router

const app = new Vue({
	...App
})
app.$mount()
