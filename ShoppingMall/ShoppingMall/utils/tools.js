/*********************************************************************
 * 常用工具方法
 *********************************************************************/
import uniTools from './uniTools.js';

/**
 * 拿到指定路径下面的模块，减少index.js文件 require.context - dir reg 不能用变量
 * @param {string} name
 * @return {Object}
 */
const getModules = (name) => {
	let modulesFiles, dir, reg;
	switch(name) {
		/* case 'directives':
			modulesFiles = require.context('@/common/directives/', true, /^.+(?<!index)\.js$/);
			break; */
		case 'components':
			modulesFiles = require.context('@/common/components/', true, /^.+(?<!index)\.(js|vue)$/);
			break;
		case 'apis':
			modulesFiles = require.context('@/apis/', true, /^.+(?<!index)\.js$/);
			break;
		case 'mixins':
			modulesFiles = require.context('@/mixins/', true, /^.+(?<!index)\.(js|vue)$/);
			break;
	}
	return modulesFiles.keys().reduce((modules, modulePath) => {
		const moduleName = modulePath.replace(/^\.\/(.+)\.(js|vue)$/, '$1');
		const value = modulesFiles(modulePath);
		value.default && (modules[moduleName] = value.default);
		return modules;
	}, {});
};

// 根据权限跳转首页
const jumpRoute = (userRole) => {
  return userRole === '管理员' ? '/system/user' : '/home';
};

/**
 * @description 格式化地理坐标
 * @param {String | Float} longitude
 * @param {String | Float} latitude
 * @return {Object} {longitude:Array,latitude:array}
 * @example this.$util.formatLocation(20.99, 30.00) {longitude:[20, 99],latitude:[30, 00]}
 */
const formatLocation = (longitude, latitude) => {
	if (typeof longitude === 'string' && typeof latitude === 'string') {
		longitude = parseFloat(longitude);
		latitude = parseFloat(latitude);
	}

	longitude = longitude.toFixed(2);
	latitude = latitude.toFixed(2);

	return {
		longitude: longitude.toString().split('.'),
		latitude: latitude.toString().split('.')
	};
};

/**
 * @description 日期处理对象
 */
const dateUtils = {
		// 日期单位
		UNITS: {
			'年': 31557600000,  // 365天
			'月': 2629800000,   // 30天
			'天': 86400000,
			'小时': 3600000,
			'分钟': 60000,
			'秒': 1000
		},

		/**
		 * @description 计算目标时间与当前时间的时间差
		 * @param {String} targetDate - 目标时间 2021-06-18 15:00:00
		 * @param {String} currentDate - 当前时间 2021-06-17 15:00:00（默认当前时间Date.now()）
		 * @param {String} type - 返回类型 值为string / array
		 * @return {String | Array | NULL} '刚刚' / '0年0月2天23小时51分钟3秒前' / '1年1月2天23小时51分钟3秒后' / [1, 1, 2, 23, 51, 3] / null
		 * @example  this.$tools.dateUtils.humanize('2021-06-18 15:00:00')
		 */
		humanize: function(targetDate, currentDate, type ='string') {
			try {
				currentDate = currentDate || formatDate();

				// ios 系统上时间转换上不支持-，需要替换成/
				currentDate = currentDate.replace(/-/g, '/');
				targetDate = targetDate.replace(/-/g, '/');

				const [t_timeStamp, c_timeStamp] = [+new Date(targetDate), +new Date(currentDate)];
				let [diff_timeStamp, milliseconds] = [t_timeStamp - c_timeStamp, Math.abs(t_timeStamp - c_timeStamp)];
				const defaultStr = diff_timeStamp > 0 ? '后' : '前';
				var humanize = '';
				for (var key in this.UNITS) {
					humanize += milliseconds >= this.UNITS[key] ? Math.floor(milliseconds / this.UNITS[key]) + key : `0${key}`;
					if (milliseconds >= this.UNITS[key]) {
						milliseconds = milliseconds - (Math.floor(milliseconds / this.UNITS[key]) * this.UNITS[key]);
					}
				}
				humanize = type === 'array' ? humanize.match(/\d+/g) : humanize ? (humanize + defaultStr) : '刚刚';
				return humanize;
			} catch(e) {
				uniTools.showToast({title: '时间传参错误'});
			}
		},

		/**
		 * @description 格式化日期 yyyy-mm-dd HH:MM:ss 转为 yyyy/mm/dd-HH:MM
		 * @param {String} dateStr
		 * @return {String} "2019/10/14-10:10"
		 * @example  this.$tools.dateUtils.format("2019-10-14 10:10:10")
		 */
		format: function(dateStr) {
			var date = this.parse(dateStr);
			var diff = Date.now() - date.getTime();
			if (diff < this.UNITS['天']) {
				return this.humanize(diff);
			}
			var _format = function(number) {
				return (number < 10 ? ('0' + number) : number);
			};
			return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDate()) + '-' +
				_format(date.getHours()) + ':' + _format(date.getMinutes());
		},

		//将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
		parse: function(str) {
			var a = str.split(/[^0-9]/);
			return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
		}
};

/**
 * formatByteSize. 字节大小格式化
 * @param {(null|string|number)} byteSize - 字节大小
 * @return {string} 格式化后的值  例：2KB
 */
const formatByteSize = (byteSize) => {
  if (!bytes) return '0B';
	const unitList = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	const index = Math.floor(Math.log(bytes) / Math.log(1024));
	const size = (bytes / Math.pow(1024, index)).toFixed(2);
	return `${size}${unitList[index]}`;
};

/**
 * 日期格式化  YYYY-MM-DD hh:mm:ss ww qq (年-月-日 时:分:秒 星期 季度)
 * @param {string} [type='YYYY-MM-DD hh:mm:ss'] - 日期格式
 * @param {Date|number|string} [val] - Date或者是时间戳
 * @param {number} [granularity=1] 分粒度 默认为1，若为10可能显示为 10:10 10:20等
 * @return {string} 格式化后的时间
 */
const formatDate = (type = 'YYYY-MM-DD hh:mm:ss', val, granularity = 1) => {
  const _val = /^\d+$/.test(val) ? val * 1 : val;
  const date = !_val || (new Date(_val) === 'Invalid Date') ? new Date() : new Date(_val);
  const YYYY = date.getFullYear() + '';
  const m = date.getMonth() + 1;
  const MM = m > 9 ? m + '' : '0' + m;
  const d = date.getDate();
  const DD = d > 9 ? d + '' : '0' + d;
  const h = date.getHours();
  const hh = h > 9 ? h + '' : '0' + h;
  const $m = Math.ceil(date.getMinutes() / granularity) * granularity;
  const mm = $m > 9 ? $m + '' : '0' + $m;
  const s = date.getSeconds();
  const ss = s > 9 ? s + '' : '0' + s;
  const week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  const ww = week[date.getDay()];
  const quarter = ['第一季度', '第二季度', '第三季度', '第四季度'];
  const qq = quarter[Math.floor((date.getMonth() + 3) / 3) - 1];
  const obj = {YYYY, MM, DD, hh, mm, ss, ww, qq};

  return type.replace(/(YYYY)|(MM)|(DD)|(hh)|(mm)|(ss)|(ww)|(qq)/g, (key) => obj[key]);
};

/**
 * 数组转为字符串的展示
 * @param {Array} arr - 数组
 * @param {string} [separator=','] - 分隔符
 * @param {string} [emptyVal=''] - 数组为空时默认显示
 * @return {string} 转换后的字符串
 */
const arrayToString = (arr, separator = ',', emptyVal = '-') => {
  if (Array.isArray(arr)) return !arr.length ? emptyVal : arr.join(separator);
  return arr || emptyVal;
};

// 字符串转数组
const stringToArray = (str, separator = ',', emptyVal = '-') => {
  if (typeof str === 'string') return !str ? emptyVal : str.split(separator);
  return str || emptyVal;
};

// 去除字符串首尾空格
const trim = (str) => {
  return str.replace(/(^\s*)|(\s*$)/g, '');
};

// 用千分位表示数字 以','隔开
const numberWithCommas = (val) => {
  if (!val) return '0';
  val = val * 1;
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * 取小数
 * @param {number|string} val - 目标数据
 * @param {number} [fixedLen=2] - 保留小数长度，默认保留2位
 * @param {boolean} [isCeil=true] - 是否四舍五入
 * @return {string}
 */
const numberFixed = (val, fixedLen = 2, isCeil = true) => {
  if (isCeil) return parseFloat(val).toFixed(fixedLen);
  let str = val + '';
  const index = str.lastIndexOf('.') + 1;
  // 小数部分的长度
  const fractionalPartLen = str.length - index;
  if (index > 0) str = str.substring(0, index + fixedLen);
  // 不足补0
  if (fractionalPartLen < fixedLen) {
    str += '0'.repeat(fixedLen - fractionalPartLen);
  }
  return str;
};

/**
 * 简单过滤字符串输入输出，将部分字符转换为字符实体，避免XSS攻击（URL请用 encodeURI() encodeURIComponent()来处理）
 * @param {string} str - 需要过滤的字符串
 * @return {string}
 */
const escapeStr = (str) => {
  const signs = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;'
  };
  const reg = /[&<>"'/]/g;
  return (str && reg.test(str)) ? str.replace(reg, chr => signs[chr]) : str;
};

/* 获取字符串长度 */
const getStringLength = (str) => {
  let num = 0;
  for (let it of str) {
    num += (/^[\u4e00-\u9fa5]+$/.test(it)) ? 2 : ['【', '】', '，', '：'].includes(it) ? 2 : 1;
  }
  return num;
};

/**
 * 获取数据类型, null 、undefined无constructor
 * @param {Any} data - 需要判断数据类型的数据
 * @param {String | Object} type - 类型
 * @return {Boolean}
 * @example this.$tools.getDataType(value1, Object)
 */
const getDataType = (data, type) => {
	return data ? data.constructor === type : typeof data === type;
};

// 判断数据是否为空  true 为空
const dataIsEmpty = (data) => {
  if (data === null) return true;
  if (typeof data !== 'object') return !data;
  if (data.constructor === Array) return !data.length;
  if (data.constructor === Object) return !Object.keys(data).length;
  return !data;
};

/**
 * 判断输入的密码格式是否正确（密码为8到20位的大小写字母、数字和特殊字符混合）
 * @param {string} pwd - 待判断密码
 * @param {boolean} [isMustSpecialChar = true] - 是否必须包含特殊字符
 * @return {boolean}
 */
const isValidPwd = (pwd, isMustSpecialChar = true) => {
  let count = 0;
  // 判断密码长度是8-20位
  if (pwd.length >= 8 && pwd.length <= 20) ++count;

  // 判断密码是否包含大写字母
  if (/[A-Z]+/.test(pwd)) ++count;

  // 判断密码是否包含小写字母
  if (/[a-z]+/.test(pwd)) ++count;

  // 判断密码是否包含数字
  if (/[0-9]+/.test(pwd)) ++count;

  if (!isMustSpecialChar) return count === 4;

  // 判断密码是否包含特殊字符
  // eslint-disable-next-line
  if (/[~@#%\+\-=\/\(_\)\*\&\<\>\[\"\;\'\|\$\^\?\!.\{\}\`]+/.test(pwd)) ++count;
	console.log(count, pwd);
  return count === 5;
};

/**
 * 判断输入的电话号码格式是否正确
 * @param {string} phone - 电话号码
 * @return {boolean}
 */
const isPhone = (phone) => {
  const reg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
  return isNaN(phone) ? false : reg.test(Number(phone));
};

/**
 * @feature 判断输入的邮箱（email）格式是否正确
 * @param {string} 123@qq.com
 * @return {boolean}
 */
const isEmail = str => {
  // eslint-disable-next-line
  // const reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
  // const reg = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
  const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  return reg.test(str);
};

/**
 * 判断输入的字符串是否全英文
 * @param {string} str - 待判断的字符串
 * @return {boolean}
 */
const isEnglish = function (str) {
  return /[\u4e00-\u9fa5]/g.test(str);
};

// 判断输入的字符串是否全中文
const isChinese = (str) => {
  return /^[\u4e00-\u9fa5]*$/g.test(str);
};

/**
 * 判断输入的ip格式（包含模糊匹配）是否正确
 * @param {string} str - 待判断的IP
 * @return {boolean}
 * @example isIp('192.168.33.22')   isIp('192.168.33.22/89')   isIp('192.168.33.*')
 */
const isIp = (str) => {
  // 判断是否是正确的IP格式 192.136.23.6 192.136.23.*
  const isIp = function (str) {
    const reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    return str.charAt(0) !== '0' && reg.test(str);
  };

  // 这里是IP段的分割，后面最好做智能判断
  const ipArr = str.split('/');
  if (ipArr.length === 1) {
    const ipParts = ipArr[0].split('.');
    return ipParts[ipParts.length - 1] === '*' ? true : isIp(ipArr[0]);
  } else if (ipArr.length === 2) {
    if (isIp(ipArr[0])) {
      const ipStart = ipArr[0].split('.')[3];
      const ipEnd = ipArr[1];
      return !!(parseInt(ipStart) < parseInt(ipEnd) && parseInt(ipEnd) >= 255);
    }
    return false;
  }
};

const getTimeStamp = () => new Date().getTime();

export {
	getModules
};

export default {
	jumpRoute,
	formatLocation,
	dateUtils,
	formatByteSize,
	formatDate,
	arrayToString,
	stringToArray,
	trim,
	numberWithCommas,
	numberFixed,
	escapeStr,
	getStringLength,
	getDataType,
	dataIsEmpty,
	isValidPwd,
	isEnglish,
	isChinese,
	isPhone,
	isEmail,
	isIp,
	getTimeStamp
};