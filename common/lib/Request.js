/**
 * 仿 axios 为请求添加适配器、拦截器
 */


const defaultConfig = {
	baseUrl: '',
	url: '',
	method: 'GET',
	type: 'json'
}

function isSuccess(status) {
	return status >= 200 && status < 300 || status == 304
}

function encoderParams(params = {}) {
	const tempArr = []
	for (let key in tempArr) {
		tempArr.push(`${key}=${params[key]}`)
	}
	return tempArr.join('&')
}

function buildFullPath(config) {
	// 处理 get 请求
	if (config.method == 'GET') {
		if (typeof config.data === 'object') {
			const str = encoderParams(config.data)
			if (str) {
				config.url += `?${str}`
			}
		}
	}
	return /^(http) | ^(https)/.test(config.url) ? config.url : config.baseUrl + config.url
}

/**
 * 请求适配器
 */
function dispatchRequest(config) {
	return new Promise((resolve, reject) => {
		const handleConfig = Object.assign({}, config, {
			url: buildFullPath(config),
			success: (res) => {
				if (isSuccess(res.statusCode)) {
					resolve({
						statusCode: res.statusCode,
						errMsg: res.errMsg,
						config: config,
						data: res.data,
						header: res.header,
					})
				} else {
					reject({
						config: config,
						errMsg: res.errMsg,
						response: res
					})
				}
			},
			fail: (err) => {
				reject({
					config: config,
					errMsg: err.errMsg || ''
				})
			}
		})
		uni.request(handleConfig)
	})
}

/**
 * 插件管理器
 */
class InterceptorManager {
	constructor() {
		this.handlers = []
	}

	use(fulfilled, rejected) {
		this.handlers.push({
			fulfilled,
			rejected
		})

		return this.handlers.length - 1;
	}

	forEach(fn) {
		for (let i = 0, len = this.handlers.length; i < len; i++) {
			if (this.handlers[i] !== null) {
				fn.call(null, this.handlers[i], i, this.handlers)
			}
		}
	}
}

class Request {
	constructor(op = {}) {
		this.config = Object.assign({}, defaultConfig, op)
		this.interceptors = {
			request: new InterceptorManager(),
			response: new InterceptorManager()
		}
	}

	post(url, data) {
		return this.request({
			url,
			data,
			method: 'POST'
		})
	}

	request(config) {
		if (typeof config == 'string') {
			config = arguments[1] || {};
			config.url = arguments[0]
		} else {
			config = config || {}
		}

		config = Object.assign({}, this.config, config)

		if (config.method) {
			config.method = config.method.toUpperCase()
		} else {
			config.method = 'GET'
		}

		let chain = [dispatchRequest, undefined]

		let promise = Promise.resolve(config)

		//执行请求插件队列
		this.interceptors.request.forEach((interceptor) => {
			chain.unshift(interceptor.fulfilled, interceptor.rejected)
		})

		//执行响应插件队列
		this.interceptors.response.forEach((interceptor) => {
			chain.push(interceptor.fulfilled, interceptor.rejected)
		})

		// 构造队列
		while (chain.length) {
			promise = promise.then(chain.shift(), chain.shift())
		}

		return promise
	}
}

export default Request;
