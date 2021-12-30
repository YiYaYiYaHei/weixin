/*********************************************************************
 * 部分页面通用方法
 * 使用：
 * import {getShoppingCarNum} from '@/mixins/partMinxins.js';
 * mixins: [getShoppingCarNum]
 * this.getCarNum()
 *********************************************************************/

// 获取购物车数量
export const getShoppingCarNum = {
	methods: {
		// 获取购物车数量
		async requestCarNum() {
			let num = 0;
			const result = await this.$apis.login.shoppingCarGetNum();
			if (result.status === 200) {
				num = result.data || 0;
			} else {
				this.$uniTools.showToast({title: '购物车数量获取失败'});
			}
			return num;
		}
	}
};