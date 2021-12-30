/*********************************************************************
 * 购物车相关接口
 * 单、双引号对数据库操作有影响，尽量使用双引号
 * 返回状态码：
 * 200-成功
 * 201-请求参数/后台报错
 * 500-数据库连接不上
 *********************************************************************/

 const dbFunc = require("./db_conf");
 const common = require("./common");

 module.exports = app => {
    // 购物车 - 新增
    app.post('/wx/shoppingCar/add', async (req, res) => {
      console.log('================ /wx/shoppingCar/add start================');

      // token解密
      const userInfo = common.decryptedToken(req);
      if (!userInfo) {
        common.resSend(res, {status: 401, message: 'token不存在'});
        return;
      }

      const params = req.body;
      if (!params.goodsId) {
        common.resSend({status: 201, message: '缺少参数goodsId'});
        return;
      }

      // 1、查询购物车表，如果该商品存在（即用户Id、商品id、商品尺寸、商品颜色一摸一样）则数量+1，否则插入购物车表
      const where = `goodsId=${params.goodsId} AND uId=${userInfo.uId} AND goodsSize="${params.goodsSize}" AND goodsColor="${params.goodsColor}"`;
      let find_res = await dbFunc.findFunc('shoppingCar', {where}).catch(e => {
        common.resSend(res, e);
        return;
      });
      if (find_res.status === 200) {
        // 2、商品存在（即用户Id、商品id、商品尺寸、商品颜色一摸一样） - 数据库数量 + 新增数量
        if (find_res.data.length) {
          await dbFunc.updateFunc('shoppingCar', {data: {goodsNum: find_res.data[0].goodsNum + Number(params.goodsNum)}, where}).catch(e => {
            common.resSend(res, e);
            return;
          });
        } else {
          const carData = {
            uId: userInfo.uId,
            goodsId: params.goodsId,
            goodsNum: params.goodsNum,
            goodsSize: params.goodsSize,
            goodsColor: params.goodsColor
          };
          // 3、商品不存在 - 将商品 插入购物车表
          await dbFunc.insertFunc('shoppingCar', carData).catch(e => {
            common.resSend(res, e);
            return;
          });
        }
        common.resSend(res, {message: '新增成功'});
      } else {
        common.resSend(res, find_res);
      }
      console.log('================ /wx/shoppingCar/add end================');
    }),
    // 购物车 - 查询（分页）
    app.post('/wx/shoppingCar/query', async (req, res) => {
      console.log('================ /wx/shoppingCar/query start================');

      // token解密
      const userInfo = common.decryptedToken(req);
      if (!userInfo) {
        common.resSend(res, {status: 401, message: 'token不存在'});
        return;
      }

      const params = req.body;

      // 1、查询总条数
      const find_total = await dbFunc.getTotal('shoppingcar', '*', null, `uId=${userInfo.uId}`).catch(e => {
        common.resSend(res, e);
        return;
      });
      if (find_total.status === 200) {
        // 2、查询购物车表  -- 多表联查，返回购物车+对应商品属性   select * from shoppingcar left join goods on shoppingcar.goodsId=goods.goodsId WHERE uId=17 limit 0,100;
        const sql = `select * from shoppingcar left join goods on shoppingcar.goodsId=goods.goodsId WHERE uId=${userInfo.uId} limit ${(params.pageCurrent - 1) * params.pageSize}, ${params.pageSize};`
        const find_res = await dbFunc.SQLOperator(sql).catch(e => {
          common.resSend(res, e);
          return;
        });
        if (find_res.status === 200) {
          console.log(find_res);
          common.resSend(res, common.getResData(Object.assign(find_res, {total: find_total.total})));
        } else {
          common.resSend(res, find_res);
        }
      } else {
        common.resSend(res, find_total);
      }

      console.log('================ /wx/shoppingCar/query end================');
    }),
    // 购物车 - 删除
    app.delete('/wx/shoppingCar/delete/:carId', async (req, res) => {
      console.log('================ /wx/shoppingCar/delete/:id start================');

      // 删除
      await dbFunc.deleteFunc('shoppingCar', `carId=${req.query.carId}`).catch(e => {
        common.resSend(res, e);
        return;
      });
      common.resSend(res, {message: '删除成功'});


      console.log('================ /wx/shoppingCar/delete/:id end================');
    });
    // 查询购物车数量
    app.get('/wx/shoppingCar/queryNum', async (req, res) => {
      console.log('================ /wx/shoppingCar/queryNum start================');

      // token解密
      const userInfo = common.decryptedToken(req);
      if (!userInfo) {
        common.resSend(res, {status: 401, message: 'token不存在'});
        return;
      }
      // 查询购物车数量
      const find_res = await dbFunc.SQLOperator(`SELECT SUM(goodsNum) AS total FROM shoppingcar WHERE uId=${userInfo.uId}`).catch(e => {
        common.resSend(res, e);
        return;
      });
      if (find_res.status === 200) {
        console.log(find_res);
        // 循环查询商品信息
        common.resSend(res, {data: find_res.data[0].total});
      } else {
        common.resSend(res, find_res);
      }

      console.log('================ /wx/shoppingCar/queryNum end================');
    })
 }