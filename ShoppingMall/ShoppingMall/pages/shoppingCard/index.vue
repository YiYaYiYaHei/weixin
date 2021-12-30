<template>
	<base-header-layout title="购物车" :hasDrawer="true">
		<base-list :loadMoreData="loadMoreData" @requestErrorReflash="getList">
			<uni-list>
				<uni-list-item v-for="(item, i) in listData" 
				               :key="i"
											 class="list-item-box box-sizing"
											 :clickable="true"
											 @click="checkGoods(item, i)">
					<template slot="header">
						<view class="list-item-header-box">
							<image class="checkbox" :src="require(`@/static/images/shoppingCard/${item.check ? 'checked' : 'check'}.png`)"></text>
							<image class="list-item-header-img" :src="item.goodsImgUrl"></image>
						</view>
					</template>
					<template slot="body">
						<view class="list-item-body-box">
							<view class="list-item-body-title">{{item.goodsDescription}}</view>
							<view class="list-item-body-property"></view>
							<view class="list-item-body-note">
								<text data-status-text="error" class="ellipsis dinlineb">￥{{item.goodsPrice}}</text>
								<text data-status-text="disabled" class="ellipsis fs-sm dinlineb">￥{{item.goodsOriginPrice}}</text>
							</view>
						</view>
					</template>
				</uni-list-item>
			</uni-list>
		</base-list>
	</base-header-layout>
</template>

<script>
import list from '@/mixins/list.js';

export default {
	mixins: [list],
	data() {
		return {}
	},
	onLoad(params) {
		// 页面加载--获取路由参数
		this.requestListParams.requestApi = this.$apis.login.shoppingCarList;
		this.getListData();
	},
	methods: {
		async getListData() {
			await this.getList();
			this.listData.map(it => it.check = false);
			console.log(this.listData)
		},
		// 商品勾选
		checkGoods(item, index) {
			this.$set(this.listData, index, Object.assign(item, {check: !item.check}))
		}
	}
}
</script>

<style lang="scss" scoped>
.list-item-box {
	width: calc(100% - 40rpx);
	margin: 10rpx 20rpx;
	border-radius: 10rpx;
}
.list-item-header-box {
	width: 240rpx;
	@include flex(row, space-around, center);
	.checkbox {
		width: 40rpx;
		height: 40rpx;
	}
}
</style>
