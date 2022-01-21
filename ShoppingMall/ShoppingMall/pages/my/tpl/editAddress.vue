<template>
	<base-header-layout title="编辑地址">
		<template #header>
			<uni-icons type="arrowleft" class="icon-s header-icon" @click="$uniTools.navigateBack()"></uni-icons>
		</template>
	</base-header-layout>
</template>

<script>
export default {
	data() {
		return {};
	},
	onLoad(params) {
		// 页面加载--获取路由参数
	},
	onPullDownRefresh() {
		// 监听用户下拉动作，一般用于下拉刷新
	},
	onReachBottom() {
		// 页面滚动到底部的事件（不是scroll-view滚到底），常用于下拉下一页数据。
	},
	methods: {

	}
};
</script>

<style lang="scss" scoped>
</style>
