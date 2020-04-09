class Socket {
	constructor() {
		this.IS_OPEN = false // socket 是否打开  
		this.MESSAGE_QUEUE = [] // 消息队列
		this.IS_EXIST = false // socket 是否存在
		// 事件监听器列表
		this.LISTENER = {
			open: null,
			error: null,
			close: null,
			message: null
		}
	}

	/**
	 * 创建socket
	 * @param {Object} option
	 * @param {function} func
	 */
	create(op, func) {
		if(this.IS_EXIST) {
			this.close()
		}
		
		uni.connectSocket({
			...op,
			success(res) {
				!!func && func('', res)
			},
			fail(err) {
				const errMessage = err || {msg: '连接失败'}
				!!func && func(errMessage, '')
			}
		})
		
		uni.onSocketOpen(() => {
			this.IS_OPEN = true 
			this.IS_EXIST = true
			
			// 发送没连接上之前存在消息队列的消息
			while (this.MESSAGE_QUEUE.length) {
				let message = this.MESSAGE_QUEUE.pop()
				this.send(message.data, message.func)
			}
		})
		uni.onSocketError(err => {
			!!this.LISTENER.error && this.LISTENER.error(err)
		})
		uni.onSocketClose(err => {
			!!this.LISTENER.close && this.LISTENER.close(err)
		})
		uni.onSocketMessage(data => {
			!!this.LISTENER.message && this.LISTENER.message(data)
		})
	}
	
	/**
	 * 监听事件
	 * @param { String } name
	 * @param { function } func
	 */
	on(name, func) {
		if(Object.keys(this.LISTENER).indexOf(name) > 0) {
			this.LISTENER[name] = func
		}else {
			throw new Error('该方法暂不支持')
		}
	}
	
	/**
	 * 发送消息
	 * @param { String | Object } data
	 * @param { function } func
	 */
	send(data = '', func) {
		if(!this.IS_OPEN) {
			// 如果还没有打开连接就发送数据, 就先把消息先存到消息队列
			this.MESSAGE_QUEUE.push({data, func})
		}else {
			if(typeof data !== 'string') {
				data = JSON.stringify(data)
			}
			uni.sendSocketMessage({
				data,
				success(res) {
					!!func && func('', res)
				},
				fail(err) {
					const errmessage = err || {msg: '发送失败'}
					!!func && func(errmessage, '')
				}
			})
		}
	}
	
	/**
	 * 关闭 socket
	 * @param {function} func
	 */
	close(func) {
		 uni.closeSocket({
			 success(res) {
				 !!func && func('', res)
			 },
			 fail(err) {
				 const errMessage = err || {msg: '关闭错误'}
			 	!!func && func(errMessage)
			 }
		 })
	}
	
	/**
	 * 重连 socket
	 * @param {function} func
	 */
	reconnection(op, func) {
		uni.connectSocket({
			...op,
			success(res) {
				!!func && func('', res)
			},
			fail(err) {
				const errMessage = err || {msg: '连接失败'}
				!!func && func(errMessage, '')
			}
		})
	}
}

export default Socket
