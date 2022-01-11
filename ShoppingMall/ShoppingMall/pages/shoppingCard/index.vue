<template>
	<base-header-layout title="购物车" :hasDrawer="true">
		<view class="shopping-car-container">
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
								<view class="list-item-body-property" @click="popupEvt(item)">
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

			<view class="footer-btn dflex">
				<!-- 全选 -->
				<view class="check-all hfull" @click="checkAllEvt"><image class="checkbox vm" :src="require(`@/static/images/shoppingCard/${checkAll ? 'checked' : 'check'}.png`)"></text>全选</view>
				<view class="box">
					<view class="total">合计：<text>￥{{checkedList.priceTotal.toFixed(2)}}</text></view>
					<button type="warn" :disabled="!checkedList.goodsNum" @click="buyEvt">去结算({{checkedList.goodsNum}})</button>
				</view>
			</view>
		</view>

		<!-- 商品属性、已选 -->
		<goods-property ref="goodsProperty" :isShow="goodsPropertyData.nodeId" :goodsProperty="goodsPropertyData.propertyData" :userChooseData.sync="userChooseData">
			<button type="primary" @click="updatePropertySubmit">确 定</button>
		</goods-property>
	</base-header-layout>
</template>

<script>
import mixins from '@/mixins/index.js';
import {updateShoppingCar, getShoppingCarNum} from '@/mixins/partMinxins.js';
import GoodsProperty from '../goods/comp/GoodsProperty.vue';
import AddCar from '../goods/comp/AddCar.vue';

export default {
	components: {GoodsProperty, AddCar},
	mixins: [mixins.list, updateShoppingCar, getShoppingCarNum, mixins.pay],
	data() {
		return {
			goodsPropertyData: {
				nodeId: 0,
				propertyData: {},
				carId: 0
			},
			userChooseData: {
				color: '',
				size: '',
				num: 1
			},
			// 是否全选
			checkAll: false,
			// 已勾选的商品列表
			checkedList: {
				priceTotal: 0,
				goodsNum: 0,
				list: []
			}
		};
	},
	watch: {
		'checkedList.list': {
			deep: true,
			handler: function(val) {
				this.checkedList.priceTotal = val.reduce((prev, it) => (prev + (it.goodsPrice * it.goodsNum)), 0);
				this.checkedList.goodsNum = val.reduce((prev, it) => (prev + it.goodsNum), 0);
			}
		}
	},
	async onLoad(params) {
		// 页面加载-设置列表接口口
		this.requestListParams.requestApi = this.$apis.login.shoppingCarList;
		// 刷新列表 - 为了保证每次跳转到购物车都从第一页开始查询
		this.resetList();
		this.getListData();

		this.shoppingCarNum();
	},
	methods: {
		// 获取列表数据
		async getListData() {
			await this.getList();
			this.setListDataProperty();
		},
		setListDataProperty() {
			this.listData.map(it => {
				it.check = false;
				it.propertyData = {
					goodsImg: it.goodsImgUrl,
					color: ['蓝色', '绿色'],
					size: ['155/80A/S', '160/84A/M', '165/88A/L'],
					priceInt: (it.goodsPrice + '').split('.')[0],
					priceFloat: (it.goodsPrice + '').split('.')[1] || '00'
				};
			});
		},
		// 商品勾选
		checkGoods(item, index) {
			this.$set(this.listData, index, Object.assign(item, {check: !item.check}));
			this.checkedList.list = this.listData.filter(it => it.check);
		},
		// 修改商品属性
		async updateGoodsProperty(val, item) {
			if (!item) return;
			item.goodsNum = val;
			this.updateShoppingCarEvt(item);
		},
		popupEvt(item) {
			this.goodsPropertyData.carId = item.carId;
			this.goodsPropertyData.propertyData = item.propertyData;
			this.userChooseData.color = item.goodsColor;
			this.userChooseData.size = item.goodsSize;
			this.userChooseData.num = item.goodsNum;
			setTimeout(() => {
				this.goodsPropertyData.nodeId = this.$tools.getTimeStamp();
			});
		},
		// 修改商品属性 - 确定
		updatePropertySubmit() {
			const params = {
				carId: this.goodsPropertyData.carId,
				goodsNum: this.userChooseData.num,
				goodsSize: this.userChooseData.size,
				goodsColor: this.userChooseData.color,
			};
			this.updateShoppingCarEvt(params, () => {
				this.goodsPropertyData.nodeId = 0;
				this.saveListScrollPos('carId', this.goodsPropertyData.carId, this.setListDataProperty);
			});
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
				// 刷新列表后，列表滚动位置不变
				this.saveListScrollPos('carId', item.carId, this.setListDataProperty);
				this.shoppingCarNum();
				this.$uniTools.showToast({title: '商品删除成功'});
			} else {
				this.$uniTools.showToast({title: '商品删除失败'});
			}
		},
		// 购物车 - 全选
		checkAllEvt() {
			this.checkAll = !this.checkAll;
			this.listData.map(it => it.check = this.checkAll);
			this.checkedList.list = this.listData.filter(it => it.check);
		},
		async buyEvt() {
			console.log(this.checkedList);
			this.getProvider();
			await this.$apis.login.pay({code: JSON.parse(uni.getStorageSync('userInfo') || '{}').code});
		}
	}
};
</script>

<style lang="scss" scoped>
.shopping-car-container {
	margin-bottom: 40px;
}
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
	}
	.list-item-body-box {
		width: calc(100% - 250rpx);
		padding-right: 40rpx;
	}
}
.checkbox {
	width: 40rpx;
	height: 40rpx;
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
.footer-btn {
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 46px;
	background-color: #fff;
	line-height: 46px;
	padding: 0 20px;
	.check-all {
		width: 70px;
		@include flex(row, space-around, center);
	}
	.box {
		width: calc(100% - 70px);
		@include flex(row, flex-end, center);
		.total {
			margin-right: 20px;
			text {
				font-weight: bold;
				color: $uni-color-error;
				letter-spacing: -1px;
			}
		}
		button {
			height: 32px;
			line-height: 32px;
			font-size: $uni-font-size-base!important;
			border-radius: 20px;
			margin: 0;
		}
	}
}
</style>
