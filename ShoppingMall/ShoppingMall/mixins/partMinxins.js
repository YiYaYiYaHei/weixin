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
		// 获取购物车数量 - 返回购物车数量
		async requestCarNum() {
			let num = 0;
			const result = await this.$apis.login.shoppingCarGetNum();
			if (result.status === 200) {
				num = result.data || 0;
			} else {
				this.$uniTools.showToast({title: result.message || '购物车数量获取失败'});
			}
			return num;
		},
		// 设置tabBar
		setCarNum(num) {
			if (num > 0) {
				uni.setTabBarBadge({index: 2, text: num + ''});
			} else {
				uni.hideTabBarRedDot({index: 2});
			}
		},
		async shoppingCarNum() {
			// 获取购物车数量
			const num = await this.requestCarNum();
			// 设置tabBar
			this.setCarNum(num);
		}
	}
};
// 修改购物车商品信息
export const updateShoppingCar = {
	methods: {
		// 修改购物车商品信息 - 返回是否修改成功
		async updateShoppingCarEvt(params, cb) {
			let isSuccess = false;
			const result = await this.$apis.login.shoppingCarUpdate(params);
			isSuccess = result.status === 200;
			if (isSuccess) {
				typeof cb === 'function' && cb();
				// 设置购物车数量
				this.shoppingCarNum();
			} else {
				this.$uniTools.showToast({title: result.message || '修改失败'});
			}
			return isSuccess;
		}
	}
};