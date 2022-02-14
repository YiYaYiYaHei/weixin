<template>
	<base-header-layout title="选择收获地址">
		<template #header>
			<uni-icons type="arrowleft" class="icon-s header-icon" @click="$uniTools.navigateBack()"></uni-icons>
		</template>

		<!-- 输入 -->
		<view></view>
		<scroll-view>
			<map style="width: 100%; height: 300px;" :latitude="latitude" :longitude="longitude" :markers="covers" show-location></map>
		</scroll-view>
	</base-header-layout>
</template>

<script>
export default {
  data() {
    return {
      // 使用 marker点击事件 需要填写id
      id: 0,
      title: 'map',
      latitude: 39.909,
      longitude: 116.39742,
      covers: [{
          latitude: 39.909,
          longitude: 116.39742,
          // iconPath: '../../../static/location.png'
      }, {
          latitude: 39.90,
          longitude: 116.39,
          // iconPath: '../../../static/location.png'
      }]
    };
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
.header-icon {
	@include pos(50%, null, null, 20rpx);
	transform: translateY(-50%);
}
</style>
