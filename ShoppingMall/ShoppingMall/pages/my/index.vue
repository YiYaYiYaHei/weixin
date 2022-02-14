<template>
	<base-header-layout title="我的收货地址" :hasDrawer="true">
		<scroll-view class="my-index-scroll-box">
			<view class="list-item dflex">
				<view class="list-left">
					<view class="harvest-address">如家酒店(成都世纪城新会展中心地铁)</view>
					<view class="house-number">哈师大卡仕达卡仕达就卡死的</view>
					<view class="personal-info">啊女士 15184449184</view>
				</view>

				<view class="list-right tc">
					<uni-icons type="compose" @click="$uniTools.navigateTo({url: '/pages/my/tpl/editAddress'})"></uni-icons>
				</view>
			</view>
		</scroll-view>
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
.my-index-scroll-box {
	.list-item {
		padding: 20rpx;
		border: 1px solid #F2F2F2;
		.list-left {
			.harvest-address {
				font-size: 30rpx;
				font-weight: 700;
				color: #333;
			}
			.house-number {
				font-size: 28rpx;
				color: #333;
			}
			.personal-info {
				font-size: 24rpx;
				color: #999;
			}
		}
		.list-right {
			width: 100rpx;
			font-size: 40rpx;
		}
	}
}
</style>
