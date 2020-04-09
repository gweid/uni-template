<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<button type="default" @click="goDetail">详情</button>
		<button type="default" @click="getStorage">本地存储</button>
		<button type="default" @click="removeStorage">清除缓存</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		async onLoad() {
			await this.$storage.setItem('info', {
				name: 'jack',
				age: 24
			})
		},
		methods: {
			goDetail() {
				this.$router.push('/pages/detail/detail')
			},
			async getStorage() {
				let ret = await this.$storage.getItem('info')
				console.log(ret)
			},
			async removeStorage() {
				await this.$storage.removeItem('info')
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
