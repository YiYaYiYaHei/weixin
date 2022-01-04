<template>
	<base-header-layout title="购物车" :hasDrawer="true">
		<base-list :loadMoreData="loadMoreData" @requestErrorReflash="getList">
			<scroll-view class="wfull">
				<view v-for="(item, i) in listData" 
						  :key="i"
						  @touchstart="(event) => touchStart(event, i)"
						  @touchmove="(event) => touchEvt(event, i)"
						  @touchend="(event) => touchEnd(event, i)"
							class="list-item-box-warpper box-sizing">
					<view class="list-item-box box-sizing transition" :style="{left: `${item.left}px`}">
						<view class="list-item-header-box flex-shrink" @click="checkGoods(item, i)">
							<!-- 是否勾选 -->
							<image class="checkbox" :src="require(`@/static/images/shoppingCard/${item.check ? 'checked' : 'check'}.png`)"></text>
							<image class="list-item-header-img" :src="item.goodsImgUrl"></image>
						</view>
						<view class="list-item-body-box flex-shrink">
							<view class="list-item-body-title">{{item.goodsDescription}}</view>
							<!-- 商品属性 -->
							<view class="list-item-body-property" @click="updateGoodsProperty(item)">
								<text class="text ellipsis">{{item.goodsSize}}，{{item.goodsColor}}</text>
								<image class="icon" src="../../static/images/shoppingCard/bottom.png">
							</view>
							<view class="list-item-body-note dflex">
								<view>
									<text data-status-text="error" class="goods-price ellipsis dinlineb">￥{{item.goodsPrice}}</text>
									<text data-status-text="disabled" class="goods-o-price ellipsis fs-sm dinlineb">￥{{item.goodsOriginPrice}}</text>
								</view>
								<!-- 数量 -->
								<uni-number-box :min="1" :value="item.goodsNum" @change="item.goodsNum=$event;updateGoodsProperty(item)"></uni-number-box>
							</view>
						</view>
						<view class="list-right flex-shrink">删除</view>
					</view>
				</view>
			</scroll-view>
		</base-list>
	</base-header-layout>
</template>

<script>
import list from '@/mixins/list.js';

export default {
	mixins: [list],
	data() {
		return {
			dragData: {}
		}
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
		},
		// 修改商品属性
		updateGoodsProperty(item) {
			console.log(item);
		},
		touchStart(event, index) {
			console.log('开始', event);
			this.$set(this.listData, index, Object.assign(this.listData[index], {startLeft: event.touches[0].clientX}));
		},
		touchEvt(event, index) {
			const btnWidth = 50;
			const item = this.listData[index];
			const _left = -(item.startLeft - event.touches[0].clientX);
			console.log(_left);
			const initVal = _left > 0 ? 15 : -btnWidth;
			const left = Math.abs(_left) > btnWidth ? initVal : _left;
			this.$set(this.listData, index, Object.assign(this.listData[index], {left}));
		},
		touchMove(event, index) {
			console.log('移动', event);
		},
		touchEnd(event, index) {
			console.log('结束', event);
		}
	}
}
</script>

<style lang="scss" scoped>
scroll-view {
	background-color: $uni-bg-color-hover;
}
.list-item-box-warpper {
	position: relative;
	width: 100%;
	min-height: 125px;
	padding: 24rpx 30rpx;
	margin: 20rpx 0;
	background-color: #fff;
}
.list-item-box {
	position: absolute;
	left: 30rpx;
	top: 12rpx;
	margin: 0;
	padding: 0;
	border-radius: 10rpx;
	view {
		line-height: 1.3;
	}
	.list-item-header-box {
		width: 240rpx;
		@include flex(row, space-around, center);
		.checkbox {
			width: 40rpx;
			height: 40rpx;
		}
	}
	.list-item-body-box {
		width: calc(100% - 250rpx);
		padding-right: 40rpx;
	}
}
.list-item-body-property {
	max-width: 100%;
	font-size: 20rpx;
	box-sizing: content-box;
	margin-bottom: 10rpx;
	@include flex(row, null, null);
	.text,
	.icon {
		height: 40rpx;
		background-color: $uni-bg-color-hover;
		line-height: 32rpx;
		vertical-align: middle;
	}
	.text {
		max-width: calc(100% - 40rpx);
		padding: 4rpx 10rpx;
		border-radius: 20rpx 0 0 20rpx;
	}
	.icon {
		width: 40rpx;
		padding-right: 10rpx;
		border-radius: 0 20rpx 20rpx 0;
	}
}
.list-right {
	width: 50px;
	height: 100%;
	background-color: $uni-color-error;
	color: #fff;
	@include flex(row, center, center);
}
</style>
