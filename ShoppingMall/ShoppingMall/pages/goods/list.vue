<template>
	<view class="goods-list-container full">
		<base-list :loadMoreData="loadMoreData" @requestErrorReflash="getList">
			<uni-list>
				<uni-list-item v-for="(item, i) in listData" 
				               :key="i"
											 class="list-item-box box-sizing"
											 :to="`/pages/goods/detail?goodsId=${item.goodsId}`">
					<template slot="header">
						<image class="list-item-header-img" :src="item.goodsImgUrl"></image>
					</template>
					<template slot="body">
						<view class="list-item-body-box">
							<view class="list-item-body-title">{{item.goodsDescription}}</view>
							<view class="list-item-body-note">
								<text data-status-text="error" class="ellipsis dinlineb">￥{{item.goodsPrice}}</text>
								<text data-status-text="disabled" class="ellipsis fs-sm dinlineb">￥{{item.goodsOriginPrice}}</text>
							</view>
						</view>
					</template>
				</uni-list-item>
			</uni-list>
		</base-list>
	</view>
</template>

<script>
import list from '../../mixins/list.js';

export default {
	mixins: [list],
	data() {
		return {}
	},
	onLoad(params) {
		// 页面加载--获取路由参数
		const navigationBarTitleText = params.type;
		uni.setNavigationBarTitle({
				title: navigationBarTitleText
		});
		this.requestListParams.requestApi = this.$apis.login.homeGetGoodsList;
		this.getList();
	},
	methods: {
	}
}
</script>
