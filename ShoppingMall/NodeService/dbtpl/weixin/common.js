/*********************************************************************
 * 接口公用方法
 *********************************************************************/
// crypto 模块提供了加密功能，https://www.jianshu.com/p/c5c8c19bc80a。
const crypto = require("crypto");

//  小程序appid、app screct
const APP_ID = 'wx0d9525966df3c4b2',
  APP_SECRECT = 'ef9154c3898612c63b9d9948bcb94d4b';

// 接口返回
function resSend(res, data = {}) {
  res.send({
    status: data.status || 200,
    message: data.message || '',
    data: data.data
  });
}

// 列表接口返回数据格式
function getResData(result) {
  let obj = null;
  if (result.hasOwnProperty('total')) {
    obj = {
      status: result.status,
      message: result.message || '',
      data: {
        total: result.total,
        rows: result.data || []
      }
    }
  } else {
    obj = {
      status: result.status,
      message: result.message || '',
      data: result.data
    }
  }
  return obj;
}

// 返回对象格式
function getObjResData(result) {
  return {
    status: result.status,
    message: result.message || '',
    data: result.data[0] || {}
  }
}

// 初始化参数
// createCipheriv - key(32位随机)
const tokenKey = 'abcdefg123456higklmn123456789opk';
// createCipheriv - iv(16位随机)
const tokenIv = 'rstuvwxyz1234567';

// 生成token   https://www.jianshu.com/p/c5c8c19bc80a。
function encryptedToken(str) {
  // createCipheriv  key的长度取决于加密类型，这里用的aes-256-cbc所以得是32位(aes-128-cbc对应16位), iv始终16位
  const cipher = crypto.createCipheriv('aes-256-cbc', tokenKey, tokenIv);
  let crypted = cipher.update(str, "utf8", "base64");
  crypted += cipher.final("base64");
  return crypted;
}

// token解密 -- {uId: 16, time: 1640662683983}
function decryptedToken(req) {
  const token = req.headers.authorization;
  if (!token) {
    return false;
  }
  const cipher = crypto.createDecipheriv('aes-256-cbc', tokenKey, tokenIv);
  let decrypted = cipher.update(token, "base64", "utf8");
  decrypted += cipher.final("utf8");
  return JSON.parse(decrypted);
}



module.exports = {
  APP_ID,
  APP_SECRECT,
  resSend,
  getResData,
  getObjResData,
  encryptedToken,
  decryptedToken
};