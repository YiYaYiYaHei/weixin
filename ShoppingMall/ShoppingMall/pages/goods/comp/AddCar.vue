<!-- 加入购物车、立即购买按钮 -->
<template>
	<view class="add-car-container">
		<button type="default" data-status-box="warning" @click="$emit('addCarEvt')">加入购物车</button>
		<button type="warn" @click="buyEvt">立即购买</button>
	</view>
</template>

<script>
export default {
	name: 'AddCar',
	data() {
		return {};
	},
	methods: {
		// 加入购物车
		async shoppingCardEvt(params) {
			const result = await this.$apis.login.shoppingCarAdd(params);
			this.$uniTools.showToast({title: '添加成功'});
			this.$emit('addCarSuccessEvt');
		},
		// 立即购买
		buyEvt() {

		}
	}
};
</script>

<style lang="scss">
.add-car-container {
	width: 100%;
	height: 38px;
	button {
		display: inline-block;
		width: 50%;
		height: 100%;
		font-size: $uni-font-size-base;
		&:after {
			border: none;
			border-top: 1px solid $uni-border-color;
			border-radius: 0;
		}
		&:nth-of-type(1) {
			&::after {
				border-right: 1px solid $uni-border-color;
			}
		}
	}
}
</style>
