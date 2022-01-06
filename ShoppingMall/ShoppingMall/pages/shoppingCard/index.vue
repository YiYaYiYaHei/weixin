<template>
	<base-header-layout title="购物车" :hasDrawer="true">
		<base-list :loadMoreData="loadMoreData" @requestErrorReflash="getList">
			<scroll-view class="wfull">
				<view v-for="(item, i) in listData" 
						  :key="i"
						  @touchstart.prevent="(event) => touchStart(event, i)"
						  @touchmove.prevent="(event) => touchMove(event, i)"
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
								<uni-number-box :min="1" :value="item.goodsNum" @change="updateGoodsProperty($event, item)"></uni-number-box>
							</view>
						</view>
						<view class="list-right flex-shrink" @click="deleteCar(item)">删除</view>
					</view>
				</view>
			</scroll-view>
		</base-list>
	</base-header-layout>
</template>

<script>
import list from '@/mixins/list.js';
import {updateShoppingCar, getShoppingCarNum} from '@/mixins/partMinxins.js';

export default {
	mixins: [list, updateShoppingCar, getShoppingCarNum],
	data() {
		return {
			dragData: {}
		}
	},
	async onLoad(params) {
		// 页面加载-设置列表接口口
		this.requestListParams.requestApi = this.$apis.login.shoppingCarList;
		// 刷新列表
		this.refreshList();
		this.shoppingCarNum();
	},
	methods: {
		async getListData(isRefresh = false) {
			await this.getList(isRefresh);
			this.listData.map(it => it.check = false);
		},
		// 商品勾选
		checkGoods(item, index) {
			this.$set(this.listData, index, Object.assign(item, {check: !item.check}))
		},
		// 修改商品属性
		async updateGoodsProperty(val, item) {
			if (!item) return;
			item.goodsNum = val;
			this.updateShoppingCarEvt(item);
		},
		// 左滑开始 - 设置开始位置
		touchStart(event, index) {
			this.$set(this.listData, index, Object.assign(this.listData[index], {startLeft: event.touches[0].clientX}));
		},
		// 左滑移动 - 计算left: (开始位置 - 移动位置) < 0 ？ 左滑 : 右滑
		touchMove(event, index) {
			// 删除按钮宽
			const btnWidth = 50;
			const item = this.listData[index];
			const _left = item.startLeft - event.touches[0].clientX;
			// 设置left值: 为了防止第一次直接右滑时出现抖动情况，因此 如果 _left为负，表示是右滑，此时直接为15；如果_left为正，表示是左滑，此时需要判断左滑的距离是否超过btnWidth。
			const left = _left < 0 ? 15 : _left > btnWidth ? -btnWidth : -_left;
			this.$set(this.listData, index, Object.assign(this.listData[index], {left}));
		},
		// 删除购物车商品
		async deleteCar(item) {
			const result = await this.$apis.login.shoppingCarDelete({carId: item.carId});
			if (result.status === 200) {
				// 手动删除列表某一项 - 为了保证删除成功后，列表滚动位置不改变
				this.deleteListItem('carId', item.carId);
				this.shoppingCarNum();
				this.$uniTools.showToast({title: '商品删除成功'});
			} else {
				this.$uniTools.showToast({title: '商品删除失败'});
			}
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
