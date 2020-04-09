/**
 * 转换路由参数
 * @param {Object} data 需转换的参数
 * @returns {String} 返回的值 如A=a&B=b
 */
function encoderPath(data) {
	const tempArr = []
	for (let key in data) {
		tempArr.push(`${key}=${data[key]}`)
	}
	return tempArr.join('&')
}

/**
 * @param { Object } op
 * @param { Number } op.pageLimit 页面栈限制数
 */
class Router {
	constructor(op) {
		this.pageLimit = op.pageLimit || 10
	}

	/**
	 * 跳转
	 * @param { String } url 跳转地址
	 * @param { Object } data 跳转参数
	 * @returns {Promise}
	 */
	push(url, data) {
		if (!url || typeof url !== 'string') {
			throw new Error(`[Router.push] url 不能为空并且必须是字符串`)
		}
		if (!!data || typeof data === 'string') {
			throw new Error(`[Router.push] data 必须是一个对象`)
		}

		if (data) {
			url += `?${encoderPath(data)}`
		}

		return new Promise((resolve, reject) => {
			const pageArr = getCurrentPages() // 获取当前页面栈

			if (pageArr.length >= this.pageLimit) {
				this.redirect(url, data)
					.then(resolve)
					.catch(reject)
			} else {
				uni.navigateTo({
					url,
					success(res) {
						resolve(res)
					},
					fail(err) {
						reject(err)
					}
				})
			}
		})
	}

	/**
	 * 删除当前页到下一页
	 * @param { String } url 跳转地址
	 * @param { Object } data 跳转参数
	 * @returns {Promise}
	 */
	redirect(url, data) {
		if (!url || typeof url !== 'string') {
			throw new Error(`[Router.redirect] url 不能为空且必须是字符串`)
		}
		if (!!data && typeof data == 'string') {
			throw new Error(`[Router.redirect] data 必须是一个对象`)
		}

		if (data) {
			url += `?${encoderPath(data)}`
		}

		return new Promise((resolve, reject) => {
			uni.redirectTo({
				url,
				success(res) {
					resolve(res)
				},
				fail(err) {
					reject(err)
				}
			})
		})
	}

	/**
	 * 删除当前页到下一页
	 * @param {Number} delta 返回页数
	 * @returns {Promise}
	 */
	back(delta) {
		return new Promise((resolve, reject) => {
			uni.navigateBack({
				delta,
				success(res) {
					resolve(res)
				},
				fail(err) {
					reject(err)
				}
			})
		})
	}

	/**
	 * 删除所有页面,跳转到指定页面
	 * @param { String } url 跳转地址
	 * @param { Object } data 跳转参数
	 * @returns {Promise}
	 */
	reLaunch(url, data) {
		if (!url || typeof url !== 'string') {
			throw new Error(`[Router.reLaunch] url 不能为空且必须是字符串`)
		}
		if (!!data && typeof data == 'string') {
			throw new Error(`[Router.reLaunch] data 必须是一个对象`)
		}

		if (data) {
			url += `?${encoderPath(data)}`
		}

		return new Promise((resolve, reject) => {
			uni.reLaunch({
				url,
				success(res) {
					resolve(res)
				},
				fail(err) {
					reject(err)
				}
			})
		})
	}

	/**
	 * 跳转到tab页
	 * @param { String } url 跳转地址
	 * @returns {Promise}
	 */
	switchTab(url) {
		if (!url || typeof url !== 'string') {
			throw new Error(`[Router.switchTab] url 不能为空且必须是字符串`)
		}

		return new Promise((resolve, reject) => {
			uni.switchTab({
				url,
				success(res) {
					resolve(res)
				},
				fail(err) {
					reject(err)
				}
			})
		})
	}
}

export default Router
