/*********************************************************************
 * 支付-公共方法
 * 支付步骤：
 * 1、判断是否支持 微信/支付宝 支付（防止用户没有下载支付宝/微信）
 * 2、请求后端接口，获取支付所需参数 {timeStamp, nonceStr, package, paySign}
 * 3、调用支付API wxPay()
 *********************************************************************/

import {mapState, mapGetters} from 'vuex';
export default {
  computed: {
		...mapState({
			openid: state => state.userInfo.openid,
			sessionKey: state => state.userInfo.sessionKey
		}),
		...mapGetters({
			token: 'getToken'
		})
	},
	data() {
		return {
			providerCN: {
				alipay: '支付宝',
				wxpay: '微信'
			}
		};
	},
	methods: {
		/**
		 * 判断是否支持 支付宝/微信 支付
		 * @param {String} provider - 支付类型 alipay/wxpay等
		 * @param {Function} successCb  - 成功后的回调函数
		 */
		getProvider(provider, successCb) {
			uni.getProvider({
				service: 'payment',
				success: (e) => {
					console.log(e);
					// e.provider - 服务供应商数组
					if (e.provider.includes(provider)) {
						typeof successCb === 'function' && successCb();
					} else {
						this.$uniTools.showToast({title: `获取${this.providerCN[provider]}通道失败，请检查您的${this.providerCN[provider]}是否正常启用`});
					}
				}
			});
		},
		/**
		 * 微信支付
		 * @param {Object} config - 微信支付所需对象 {timeStamp, nonceStr, package, paySign}
	   * @param {Function} successCb  - 成功后的回调函数
		 * @param {Function} errorCb - 失败后的回调函数
		 */
    wxPay(config, successCb, errorCb) {
			uni.requestPayment({
				provider: 'wxpay',
				timeStamp: config.timeStamp,
				nonceStr: config.nonceStr,
				package: config.package,
				signType: 'MD5',
				paySign: config.paySign,
				success: successCb,
				fail: (err) => {
					this.$uniTools.showToast({title: '支付失败,请重试', success: errorCb});
					console.log('fail:' + JSON.stringify(err));
				}
			});
		}
	}
};
