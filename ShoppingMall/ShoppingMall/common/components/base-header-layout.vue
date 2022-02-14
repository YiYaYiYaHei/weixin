<template>
	<view class="full fs0 pr base-header-layout-container">
		<!-- 状态栏占位 -->
		<view class="uni-custom"></view>

		<view class="uni-custom-content">
			<!-- 头部 标题 -->
			<view class="wfull base-header-container" :style="{'bottom': capsuleSize.headerBottom}" id="header">
				<view class="base-header-content-container full">
					<template v-if="hasDrawer">
						<uni-icons type="bars" class="icon-lg" @click="this.$refs.drawer.open()"></uni-icons>
					</template>
					<text v-if="title" class="base-header-title">{{title}}</text>
					<slot name="header"></slot>
				</view>
			</view>

			<!-- 内容 -->
			<view class="wfull base-content-container" :style="{'padding-top': `${capsuleSize.headerReallyHeight}px`}">
        <!-- 副标题 -->
				<template v-if="hasSubHeader">
					<view class="wfull base-content-pos-box" :style="{'top': `${capsuleSize.headerReallyBottom}px`}">
						<slot name="subHeader"></slot>
					</view>
				</template>

        <!-- 内容 -->
				<view class="wfull base-content-scroll-box" :style="{'height': hasSubHeader ? `calc(100% - ${capsuleSize.headerReallyHeight}px)` : '100%'}">
					<slot></slot>
				</view>
			</view>
		</view>

		<uni-drawer ref="drawer" mode="left">
			<text v-for="item in barsList" :key="item.url" @click="navigatorEvt(item)" class="dblock drawer-item">{{item.label}}</text>
		</uni-drawer>
	</view>
</template>

<script>
/**
 * @description 导航栏页面布局（page.json -> "navigationStyle": "custom"）
 * @param {Boolean} hasDrawer - 是否有drawer
 * @param {Boolean} hasSubHeader - 是否有固定的副页头（类似淘宝的商品详情滚动到一定位置出现的tab列--商品、详情、评论、推荐）
 * @param {String} title - 页面标题
 * 使用hasSubHeader时，注意给.base-content-scroll-box设置margin-top，margin-top值为base-content-pos-box的高
 * @example  <base-header-layout><view>页面内容</view></base-header-layout>
 */
import common from '@/mixins/common.js';
export default {
	mixins: [common],
	props: {
		hasDrawer: {
			type: Boolean,
			default: false
		},
		hasSubHeader: {
			type: Boolean,
			default: false
		},
		title: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			// 胶囊尺寸（小程序为胶囊尺寸，app为实际高度）
			capsuleSize: {
				// 顶部导航bootom值（小程序为胶囊实际bottom值，app固定为auto）
				headerBottom: 'auto',
				// 顶部导航实际高度
				headerReallyHeight: 0,
				// 顶部导航实际bottom值
				headerReallyBottom: 0
			},
			barsList: [
				{label: '弧形文字', url: '/subPackages/otherPages/pages/arcText'},
				{label: '幸运大转盘', url: '/subPackages/otherPages/pages/choujiang'},
				{label: '文件上传、下载', url: '/subPackages/otherPages/pages/file'},
				{label: 'filePicker', url: '/subPackages/otherPages/pages/filePicker'},
				{label: 'uniForm', url: '/subPackages/otherPages/pages/uniFormTest'},
				{label: '新手引导页', url: '/subPackages/otherPages/pages/guide'}
			]
		};
	},
	mounted() {
		// 获取右上角胶囊尺寸（小程序才有胶囊）
		// #ifdef MP
		const capsuleSize = uni.getMenuButtonBoundingClientRect();
		this.capsuleSize.headerBottom = `calc(100% - ${capsuleSize.bottom + 10}px)`;
		// #endif

		// 计算顶部导航实际高度
		this.$nextTick(async () => {
			const headerSize = await this.$uniTools.getDom(this, `#header`);
			this.capsuleSize.headerReallyHeight = headerSize.data[0].height;
			this.capsuleSize.headerReallyBottom = headerSize.data[0].bottom;
		});
	},
	methods: {
		navigatorEvt(item) {
			this.$refs.awer.close();
			setTimeout(() => {
				this.$uniTools.navigateTo({url: item.url});
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.uni-custom-content {
	.base-header-container {
		@include statusBox($uni-color-success);
		@include pos(var(--status-bar-height), 0, null, 0, fixed);
		z-index: 2;
		padding: 14px;
		.base-header-content-container {
			@include flex(row, null, center);
			.base-header-title {
				margin: 0 auto;
			}
		}
	}
	.base-content-container {
		height: 100%;
		min-height: 100%;
		background: white;
	}
}
/deep/.uni-drawer {
	top: var(--status-bar-height)!important;
	.uni-drawer__content {
		padding: $uni-spacing-row-lg;
	}
}
.base-content-pos-box {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 3;
}

// drawer样式---start---
.drawer-item {
	@include line-height(72rpx);
}
// drawer样式---end---
</style>
