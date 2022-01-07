/*********************************************************************
 * 列表方法
 *
 * 注意：
 * 1、上拉加载，需设置requestListParams参数，onLoad生命周期中需要手动调用getList，调用getList方法前需设置请求地址和参数
 * 2、需在onReachBottom生命周期，调用reachBottomEvt方法
 *********************************************************************/

 export default {
	data() {
		return {
			// 分页参数
			pagingData: {
				// 每页展示的条数
				size: 10,
			  // 当前页
				current: 1,
				// 总数
				total: 0
			},
			// 列表数据
			listData: [],
			// 列表接口请求参数
			requestListParams: {
				requestApi: null,
				params: null
			},
			// 加载更多参数
			loadMoreData: {
				iconSize: 24,
				status: 'more',
				showIcon: true,
				iconType: 'auto',
				color: '#777777',
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				// 其他状态：当otherStatus有值时，表示接口请求失败otherStatus=error / 数据为空otherStatus=empty
				otherStatus: ''
			},
			// 页面滚动高
			pageScrollTop: 0
		}
	},
	onPullDownRefresh() {
		// 监听用户下拉动作，一般用于下拉刷新
		this.refreshList('pullDownRefresh');
	},
	onReachBottom() {
		// 页面滚动到底部的事件（不是scroll-view滚到底），常用于下拉下一页数据。
		this.reachBottomEvt();
	},
	// 页面滚动
	onPageScroll(e) {
		this.pageScrollTop = e.scrollTop;
	},
	methods: {
		// 页面滚动到底部的事件--在onReachBottom生命周期调用
		reachBottomEvt() {
			if (this.pagingData.current * this.pagingData.size < this.pagingData.total) {
				this.pagingData.current++;
				this.getList();
			}
		},
		// 获取分页参数
		getPageParams() {
			return {
				pageCurrent: this.pagingData.current,
				pageSize: this.pagingData.size,
			}
		},
		// getList请求前，需判断是否最后一页
		isLoadMore() {
			return (this.pagingData.current - 1) * this.pagingData.size >= this.pagingData.total;
		},
		/**
		 * 获取列表数据
		 * 调用getList方法前需设置请求地址(requestListParams.requestApi)和参数(requestListParams.params 对分页参数已做自动添加)
		 * @param {Function | Null} [callback] - 回调函数
		 *
		 */
		async getList(callback) {
			// 若为最后一页,则不发请求
			if (!!this.listData.length && this.isLoadMore()) {
				this.loadMoreData.status = 'noMore';
				return;
			}
			this.requestListParams.params = this.requestListParams.params ? Object.assign(this.requestListParams.params, {...this.getPageParams()}) : {...this.getPageParams()};
			this.loadMoreData.status = 'loading';
			let result = await this.requestListParams.requestApi(this.requestListParams.params);
			this.loadMoreData.status = 'more';
			if (result.status === 200) {
				this.listData = this.listData.concat((result.data || {rows: []}).rows);
				this.pagingData.total = (result.data || {total: []}).total;

				// 设置加载更多的状态--防止上拉过快，最后一页“加载更多”的提示语不正确(解决滑到最后一页的时候，没有触发onReachBottom，需要手动下滑在上拉的问题)
				this.loadMoreData.status = this.pagingData.current === Math.ceil(this.pagingData.total / this.pagingData.size) ? 'noMore' : 'more';
				this.loadMoreData.otherStatus = this.pagingData.total ? '' : 'empty';
			} else {
				this.loadMoreData.otherStatus = 'error';
				this.$uniTools.showToast({title: result.message});
			}
			typeof callback === 'function' && callback();
		},
		// 重置列表数据
		resetList() {
			this.pagingData.current = 1;
			this.pagingData.total = 0;
			this.listData = [];
		},
		/**
		 * 按条件搜索时调用   查询、删除、新增时调用
		 * @param {String} type - 操作类型，type=pullDownRefresh表示下拉刷新操作
		 */
		refreshList(type) {
			this.resetList();
			/* setTimeout(() => {
				(type === 'pullDownRefresh') && this.getList(() => uni.stopPullDownRefresh());
				(type !== 'pullDownRefresh') && this.getList();
			}, 800); */
			(type === 'pullDownRefresh') && this.getList(() => uni.stopPullDownRefresh());
			(type !== 'pullDownRefresh') && this.getList();
		},
		// 记录页面滚动位置   https://blog.csdn.net/wzard/article/details/116267997
		saveScrollTop() {
			uni.pageScrollTo({
				//距离页面顶部的距离
				scrollTop: this.pageScrollTop,
				duration: 0
			});
		},
		/** 
		 * 刷新列表后，列表滚动位置不变 - 比如购物车 编辑商品、删除商品 成功后，列表都停留在操作位置
		 * 由于要保证数据刷新后，列表的滚动位置不变，所以需要获取操作项的索引，然后判断它在第几页，使用splice手动去刷新列表数据
		 * @param {String} key - key名
		 * @param {Any} value - key值
		 * @param {Function} [callback] - 回调函数
		 */
		async saveListScrollPos(key, value, callback) {
			// 1、获取操作项的索引
			const index = this.listData.findIndex(it => it[key] === value);
			// 2、计算操作项在第几页
			const pageCurrent = Math.ceil((index + 1) / this.pagingData.size);
			const pageParams = {
				pageCurrent,
				pageSize: this.pagingData.size,
			};
			// 3、重新请求该页的数据
			this.requestListParams.params = this.requestListParams.params ? Object.assign(this.requestListParams.params, {...pageParams}) : {...pageParams};
			let result = await this.requestListParams.requestApi(this.requestListParams.params);
			if (result.status === 200) {
				// 4、更新数组中该页的数据
				const newData = (result.data || {rows: []}).rows;
				this.listData.splice((pageCurrent - 1) * this.pagingData.size, this.pagingData.size, ...newData);
				typeof callback === 'function' && callback();
			} else {
				this.$uniTools.showToast({title: result.message});
			}
		}
	}
 }