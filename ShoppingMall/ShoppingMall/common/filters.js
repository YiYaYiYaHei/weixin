import Tools from '@/utils/tools.js';

/**
 * 日期格式化
 * @param {string|number} val - 原始值
 * @param {string} type - 格式YYYY-MM-DD hh:mm:ss
 * @returns {string} 返回值
 */
const formatDate = (val, type = 'YYYY-MM-DD hh:mm:ss') => val ? Tools.formatDate(val, type) : '-';

// 字节大小格式化
const formatByteSize = (val) => Tools.formatByteSize(val);

// 数字千分位展示
const numberWithCommas = val => Tools.numberWithCommas(val);

// 转换空字符串
const transformNull = (value, defaultString) => {
  return value === 0 || !Tools.dataIsEmpty(value) ? Tools.escapeStr(value) : defaultString;
};

// 成功/失败/告警状态
const transformStatus = (value, status) => {
  if (status === 'success') return `<span class="status-success">${value}</span>`;
  if (status === 'error') return `<span class="status-error">${value}</span>`;
  if (status === 'warning') return `<span class="status-warning">${value}</span>`;
  return value;
};

// 数组转字符串
const transformArrToStr = (val, sep = ',', emptyVal = '-') => Tools.arrayToString(val, sep, emptyVal);

// 字符串转数组
const transformStrToArr = (val, sep = ',', emptyVal = '-') => Tools.stringToArray(val, sep, emptyVal);

export default {
  formatDate,
	formatByteSize,
	numberWithCommas,
	transformNull,
	transformStatus,
	transformArrToStr,
	transformStrToArr
};
