<template>
	<base-header-layout title="`${type==='add' ? '新建' : '编辑'}收获地址`">
		<template #header>
			<uni-icons type="arrowleft" class="icon-s header-icon" @click="$uniTools.navigateBack()"></uni-icons>
		</template>

		<uni-forms class="dblock edit-address-form" ref="form" v-model="formData" label-width=80>
			<uni-forms-item label="收货地址:" name="address">
				<view class="address dflex wfull">
					<text class="iconfont icon-car fs-lgr" data-status-text="success"></text>
					<uni-easyinput type="text" v-model="formData.address" placeholder="点击选择" disabled :clearable="false"/>
					<uni-icons type="arrowright" class="icon-s icon-right" @click="$uniTools.navigateTo({url: '/pages/my/tpl/address'})"></uni-icons>
				</view>
			</uni-forms-item>
			<uni-forms-item label="门牌号:" name="houseNumber">
				<uni-easyinput type="text" v-model="formData.houseNumber" placeholder="详细地址，例:号楼5层501室" :clearable="false"/>
			</uni-forms-item>
			<uni-forms-item label="联系人:" name="contacts">
				<uni-easyinput type="text" v-model="formData.contacts" placeholder="请填写收货人姓名" :clearable="false"/>
			</uni-forms-item>
			<uni-forms-item name="sex">
				<base-form-radio-group v-model="formData.sex" :options="['先生', '女士']"></base-form-radio-group>
			</uni-forms-item>
			<uni-forms-item label="手机号:" name="phone">
				<uni-easyinput type="text" v-model="formData.phone" placeholder="请填写收货人手机号" :maxlength="11" :clearable="false"/>
			</uni-forms-item>
			<uni-forms-item label="标签:" name="tag" class="tag-form-item">
				<text class="tag" :data-tag="item" v-for="(item, i) in ['家', '公司', '学校']" :key="`tag_${i}`" :class="{'active': item === formData.tag}">{{item}}</text>
			</uni-forms-item>
			<button type="success" class="mgt20" :disabled="btnDisabled" @click="submitForm">保 存</button>
		</uni-forms>
	</base-header-layout>
</template>

<script>
import form from '@/mixins/form.js';
export default {
	mixins: [form],
	data() {
		return {
			type: 'add',
			formData: {
				address: '111',
				houseNumber: '',
				contacts: '',
				sex: '先生',
				phone: '',
				tag: ''
			},
			formRules: {
				address: {
          rules: [{required: true, errorMessage: '请选择收获地址'}]
        },
				houseNumber: {
				  rules: [{required: true, errorMessage: '请输入门牌号'}]
				},
				contacts: {
				  rules: [{required: true, errorMessage: '请输入联系人'}]
				},
				phone: {
					rules: [{required: true, validateFunction: this.$validates.phone, errorMessage: '请输入联系人手机号'}]
				}
			},
			btnDisabled: true
		};
	},
	onReady(params) {
		console.log(params);
		// 需要在onReady中设置规则
		this.$refs.form.setRules(this.formRules);
	},
	onPullDownRefresh() {
		// 监听用户下拉动作，一般用于下拉刷新
	},
	onReachBottom() {
		// 页面滚动到底部的事件（不是scroll-view滚到底），常用于下拉下一页数据。
	},
	watch: {
		formData: {
			deep: true,
			handler: function(val) {
				this.submitBtnIsDisabled();
			}
		}
	},
	methods: {
		// 判断保存按钮是否禁用
		submitBtnIsDisabled() {
			this.submitForm(() => {
				this.btnDisabled = false;
			});
			this.btnDisabled = true;
		}
	}
};
</script>

<style lang="scss" scoped>
.header-icon {
	@include pos(50%, null, null, 20rpx);
	transform: translateY(-50%);
}
.edit-address-form{
	padding: 40rpx;
	/deep/.uni-forms-item {
		border-bottom: 1px solid #e5e5e5;
		margin-bottom: 12px;
		.uni-forms-item__inner {
			padding-bottom: 10px;
		}
		.is-input-border {
			border: none;
		}
	}
	.address {
		.icon-car {
			font-weight: 600;
		}
		.icon-right {
			color: $uni-text-color-disable;
		}
		/deep/uni-easyinput {
			width: calc(100% - 20px);
		}
		/deep/.uni-easyinput__content-input {
			padding-left: 4px!important;
		}
	}
}
/deep/.uni-easyinput__content.is-disabled {
	background-color: transparent!important;
}
/deep/.base-form-radio-group-container {
	margin-left: 80px;
}
.tag {
	padding: 8rpx 16rpx;
	border: 1px solid #e5e5e5;
	vertical-align: middle;
	font-size: 12px;
	color: $uni-text-color;
	&.active {
		border: 1px solid $uni-color-success;
		color: $uni-color-success;
	}
}
.tag[data-tag="公司"] {
	margin: 0 20px;
}
.tag-form-item {
	/deep/.uni-forms-item__content {
		padding: 5px 0;
	}
}
/deep/.uni-error-message {
	// display: none;
}
</style>
