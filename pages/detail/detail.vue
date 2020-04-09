<template>
	<view class="">
		<view class="">详情</view>
		<button type="default" @click="toBack">返回</button>
	</view>
</template>

<script>
	export default {
		methods: {
			toBack() {
				this.$router.back()
			}
		}
	}
</script>

<style>
</style>
