<script>
export default {
	onLaunch: function() {
		// 当uni-app 初始化完成时触发（全局只触发一次）
	},
	onShow: function() {
		// 当 uni-app 启动，或从后台进入前台显示
	},
	onHide: function() {
		// 当 uni-app 从前台进入后台
	}
};
</script>

<style lang="scss">
// 引入iconfont
@import '@/static/iconfont/iconfont.css';
// 系统常用样式
@import './styles/common.scss';
// 重置uni组件部分样式
@import  './styles/resetUni.scss';
// 重置标签样式
@import './styles/reset.scss';
</style>
