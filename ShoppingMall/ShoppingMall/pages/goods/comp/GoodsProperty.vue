<template>
	<!-- 商品属性、已选 -->
	<base-popup-dialog :nodeId="nodeId"
										 footerType="custom"
										 type="bottom"
										 :maskClick="true"
										 :showClose="true"
										 class="goods-property-dialog-container">
		<scroll-view scroll-x="true">
			<view class="goods-property-title-box">
				<view class="img" @click="previewImg(0, goodsProperty.goodsImg)">
					<image :src="goodsProperty.goodsImg" mode="heightFix" class="full"></image>
				</view>
				<view class="descript-box">
					<view class="price">￥<text>{{goodsProperty.priceInt}}</text>.{{goodsProperty.priceFloat}}</view>
					<view class="descript">
						<text data-status-text="disabled">已选</text>
						{{userChooseData.color}}，{{userChooseData.size}}
					</view>
				</view>
			</view>
			<view class="property-box">
				<text class="dblock title">颜色</text>
				<view class="property-list">
					<text v-for="item, i in goodsProperty.color"
					     :key="item"
							 @click="userChooseData.color=item"
							 :class="{'active': userChooseData.color === item}">{{item}}</text>
				</view>
			</view>
			<view class="property-box">
				<text class="dblock title">尺寸</text>
				<view class="property-list">
					<text v-for="item, i in goodsProperty.size"
					     :key="item"
							 @click="userChooseData.size=item"
							 :class="{'active': userChooseData.size === item}">{{item}}</text>
				</view>
			</view>
			<view class="property-box num-box">
				<text class="dblock title">数量</text>
				<uni-number-box :min="1" v-model="userChooseData.num"></uni-number-box>
			</view>
		</scroll-view>
		<template #footer>
			<slot></slot>
		</template>
	</base-popup-dialog>
</template>

<script>
export default {
	name: 'GoodsProperty',
	props: {
		isShow: {
			type: Number,
			default: 0
		},
		goodsProperty: {
			type: Object,
			default: () => ({})
		},
		userChooseData: {
			type: Object,
			default: () => ({})
		}
	},
	watch: {
		isShow: function(val) {
			this.nodeId = val;
		},
		userChooseData: {
			deep: true,
			handler: function(val) {
				console.log(val);
				this.$emit('update:userChooseData', val);
			}
		}
	},
	data() {
		return {
			nodeId: 0
		};
	}
};
</script>

<style lang="scss" scoped>
.goods-property-dialog-container {
	.goods-property-title-box {
		width: 100%;
		height: 200rpx;
		@include flex(row, space-between, null);
		.img {
			width: 40%;
			height: 100%;
			border-radius: 10rpx;
			overflow: hidden;
		}
		.descript-box {
			width: 60%;
			height: 100%;
			@include flex(column, flex-end, null);
			.price {
				font-size: $uni-font-size-smm;
				color: red;
				font-weight: 600;
				>text {
					font-size: $uni-font-size-lg;
				}
			}
			.descript {
				font-size: $uni-font-size-smmm;
				color: $uni-text-color-black;
				>text {
					margin-right: 10rpx;
				}
			}
		}
	}
	.property-box {
		margin: 20rpx 0;
		.title {
			font-size: $uni-font-size-smm;
			font-weight: 600;
			color: $uni-text-color-black;
			margin-bottom: 30rpx;
		}
		.property-list {
			@include flex(row, null, null, wrap);
			>text {
				padding: 10rpx 16rpx;
				font-size: $uni-font-size-smmm;
				color: $uni-text-color-grey-deep;
				background-color: $uni-text-color-placeholder-light;
				border-radius: 16rpx;
				margin-right: 20rpx;
				margin-bottom: 20rpx;
				&.active {
					background-color: rgba(241, 94, 78, .2);
					color: $uni-color-error;
					border: 1px solid $uni-color-error;
				}
			}
		}
		&.num-box {
			@include flex(row, space-between, null);
		}
	}
}
</style>
