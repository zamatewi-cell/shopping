let baseUrl = __basename + '/db/model'

//导入商家用户模型
let BUser = require(baseUrl + '/bUser.js');

//导入商品数据模型
let Product = require(baseUrl + '/product.js');

//导入用户模型
let User = require(baseUrl + '/user.js');

//导入类型模型
let Type = require(baseUrl + '/type.js');

//导入收藏商品模型
let Like = require(baseUrl + '/like.js');

//导入购物车商品模型
let Shopcart = require(baseUrl + '/shopcart.js');

//导入地址模型
let Address = require(baseUrl + '/address.js');

//导入订单模型
let Order = require(baseUrl + '/order.js');

//导入验证码模型
let Validcode = require(baseUrl + '/validcode.js');

//导出所有模型
module.exports = {
  BUser,
  User,
  Product,
  Type,
  Like,
  Shopcart,
  Address,
  Order,
  Validcode
}