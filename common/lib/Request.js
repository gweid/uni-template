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
