/*********************************************************************
 * 其他公共方法
 *********************************************************************/
 
export default {
	data() {
		return {}
	},
	computed: {},
	methods: {
		// 获取节点尺寸信息
		async getDom(className, isAll = true) {
			const result = await this.$uniTools.getDom(this, className, isAll);
			return result;
		}
	}
};
