/*********************************************************************
 * 自定义表单校验规则--同步校验
 * @param {Object} rule - 当前校验字段在 rules 中所对应的校验规则
 * @param {string} value - 当前校验字段的值
 * @param {Object} data - 所有校验字段的字段和值的对象
 * @param {Function} callback - 回调函数
 *********************************************************************/
import Tools from '@/utils/tools.js';
import Apis from '@/apis/login.js';

// 获取最后一次的输入值(保证校验值的准确性)
function getLastValue(rule, data) {
	const key = JSON.parse(rule.label || '[]')[0];
	return data[key];
}

/**
 * 表单验证前期工作 先验证是否是必填
 * @param {Object} rule - 表单项的相关属性
 * @param {String} [rule.field] - 表单项属性名
 * @param {Boolean} [rule.errorMessage] - 表单项输入错误后的提示语句
 * @param {Boolean} [rule.required] - 该表单项是否必填
 * @param {String} [rule.newPwdRepeat] - 新密码，一般确认密码才需要这个参数
 * @param {Function|Null} [handlerCb = null] - 返回 除表单项是否必填验证后，其它后续验证工作过程中的错误信息
 */
const commonValidate = async (rule, value, data, callback, handlerCb) => {
	const _value = getLastValue(rule, data);
  const isValueEmpty = _value === 0 ? false : Tools.dataIsEmpty(_value);
  // 非必填且无值 不继续验证
  if (!rule.required && isValueEmpty) {
    callback();
  }
  // 必填且无值 提示为空，不继续验证
  if (rule.required && isValueEmpty) {
    const msg = rule.errorMessage ? rule.errorMessage : `请输入${rule.field}`;
    callback(msg);
  }
  // 也可以不传handlerCb，但是这样需要每个校验方法都添加commonValidate返回值的判断
  const msg = handlerCb ? await handlerCb({rule, value: _value}) : '';
  callback(msg);
};

/**
 * @description 密码验证方法
 * @param {Object} rule - 当前校验字段在 rules 中所对应的校验规则
 * @param {string} [rule.newPassword] - 新密码值，一般确认密码才需要这个参数
 * @param {string} [rule.field] - 字段类型：密码、确认密码、重复密码
 * @param {boolean} rule.required - 表示该密码是否必填
 */
const password = (rule, value, data, callback) => commonValidate(rule, value, data, callback, ({rule, value}) => {
  const newPwdRepeat = rule.newPwdRepeat;
  const type = rule.field;
  const ERROR_MSG = {
    ILLEGAL: `${type}为8~20位大小写英文字母和数字（特殊字符可选）混合`,
    NOT_REPEAT: '确认密码和新密码不同',
    NOT_SAME: '两次输入密码不同'
  };
  if (!Tools.isValidPwd(value, false)) return ERROR_MSG.ILLEGAL;
  if (type === '确认密码' && value !== newPwdRepeat) return ERROR_MSG.NOT_REPEAT;
  if (type === '重复密码' && value !== newPwdRepeat) return ERROR_MSG.NOT_SAME;
});

// 用户名
const userName = (rule, value, data, callback) => commonValidate(rule, value, data, callback, async (value) => {
  if (rule.isEdit) return '';
  const result = await Apis.systemManage.checkUser(value);
  if (!!result && result.status === 200 && result.data) return '该用户名已存在';
});

// 验证电话
const phone = (rule, value, data, callback) => commonValidate(rule, value, data, callback, ({value}) => {
	if (!Tools.isPhone(value)) return '手机号格式有误';
});

const ip = (rule, value, data, callback) => commonValidate(rule, value, data, callback, ({value}) => {
	if (!Tools.isIp(value)) return 'IP格式有误';
});


export default {
	commonValidate,
  password,
  userName,
	phone,
	ip
};
