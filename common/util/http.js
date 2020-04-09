import Request from '../lib/Request.js'
import config from "../config/config.js"

const http = new Request({
	baseUrl: config.BASE_URL,
	headers: {}
})

// 请求拦截器
http.interceptors.request.use(async requestConfig => {

})

// 响应拦截器
http.interceptors.response.use(
	async respones => {}, err => {}
)

export default http
