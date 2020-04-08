<template>
	<view class="">详情</view>
	<button type="default" @click="back">返回</button>
</template>

<script>
	export default {
		methods: {
			back() {
				this.$router.back()
			}
		}
	}
</script>

<style>
</style>
