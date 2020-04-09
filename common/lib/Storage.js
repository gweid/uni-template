class Storage {
	constructor() {

	}

	/**
	 * 储存本地数据
	 * @param {String} key
	 * @param {Object | String} data
	 * @param {Number} timeout 
	 */
	setItem(key, data) {
		return new Promise((resolve, reject) => {
			uni.setStorage({
				key,
				data,
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
	 * 储存本地数据同步版本
	 * @param {String} key
	 * @param {Object | String} data
	 */
	setItemSync(key, data) {
		return uni.setStorageSync(key, data)
	}

	/**
	 * 获取本地数据
	 * @param {String} key
	 */
	getItem(key) {
		return new Promise((resolve, reject) => {
			uni.getStorage({
				key,
				success(res) {
					resolve(res.data)
				},
				fail(err) {
					reject(err)
				}
			})
		})
	}
	/**
	 * 获取本地数据同步版本
	 * @param {String} key
	 */
	getItemSync(key) {
		return uni.getStorageSync(key)
	}

	/**
	 * 删除本地数据
	 * @param {String} key
	 */
	removeItem(key) {
		return new Promise((resolve, reject) => {
			uni.removeStorage({
				key,
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
	 * 删除本地数据同步版
	 * @param {String} key
	 */
	removeItemSync(key) {
		return uni.removeStorageSync(key)
	}

	/**
	 * 删除本地所有数据
	 */
	removeAllItem() {
		return new Promise((resolve, reject) => {
			uni.clearStorage()
			resolve()
		})
	}
	/**
	 * 删除本地的所有缓存同步版
	 */
	removeAllItemSync() {
		return uni.clearStorageSync()
	}

	/**
	 * 获取本地缓存的信息
	 */
	getStorageInfo() {
		return new Promise((resolve, reject) => {
			uni.getStorageInfo({
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
	 * 获取本地缓存的信息同步版
	 */
	getStorageInfo() {
		return uni.getStorageInfoSync()
	}
}

export default new Storage()
