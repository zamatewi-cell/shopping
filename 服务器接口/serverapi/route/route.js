//导出函数
//路由层

//导入路由控制器层
let routeController = require(__basename + '/route_controller/route_controller.js');


module.exports = app => {


  //路由


  //token拦截
  app.use(routeController.validToken);


  //商家端========================================start

  //注册
  app.post('/bUserRegister', routeController.bUserRegister);

  //登录
  app.post('/bUserLogin', routeController.bUserLogin);

  //添加商品类型
  app.post('/bAddType', routeController.bAddType);

  //商家获取商品类型
  app.get('/bGetType', routeController.bGetType);

  //添加商品
  app.post('/bAddProduct', routeController.bAddProduct);

  //查询商家用户信息
  app.get('/bGetUserInfo', routeController.bGetUserInfo);

  //商家退出登录
  app.post('/bLogout', routeController.bLogout);

  //商家获取商品
  app.get('/bGetProduct', routeController.bGetProduct);

  //商家端========================================end



  //注册
  app.post('/register', routeController.register);

  //登录
  app.post('/login', routeController.login);

  //商品类型
  app.get('/type', routeController.type);

  //根据条件查询商品数据
  app.get('/typeProducts', routeController.typeProducts);

  //首页商品查询，根据指定商品标志查询
  app.get('/flagProducts', routeController.flagProducts);

  //查看商品详情
  app.get('/productDetail', routeController.productDetail);
  
  //收藏，需要token验证
  app.post('/like', routeController.like);

  //取消收藏，需要token验证
  app.post('/notlike', routeController.notlike);

  //查询收藏商品，需要token验证
  app.get('/findlike', routeController.findlike);

  //查询用户所有收藏商品，需要token验证
  app.get('/findAllLike', routeController.findAllLike);

  //加入购物车
  app.post('/addShopcart', routeController.addShopcart);

  //查询购物车总数量
  app.get('/shopcartCount', routeController.shopcartCount);

  //查询购物车所有数据
  app.get('/findAllShopcart', routeController.findAllShopcart);

  //修改购物车商品数量
  app.post('/modifyShopcartCount', routeController.modifyShopcartCount);

  //物理删除单个或者多个购物车商品
  app.post('/deleteShopcart', routeController.deleteShopcart);

  //逻辑删除单个或者多个购物车商品
  app.post('/removeShopcart', routeController.removeShopcart);

  //新增地址
  app.post('/addAddress', routeController.addAddress);

  //删除地址
  app.post('/deleteAddress', routeController.deleteAddress);

  //查询地址
  app.get('/findAddress', routeController.findAddress);

  //编辑地址
  app.post('/editAddress', routeController.editAddress);

  //根据地址aid获取地址数据
  app.get('/findAddressByAid', routeController.findAddressByAid);

  //购物车提交订单接口
  app.get('/commitShopcart', routeController.commitShopcart);

  //立即结算
  app.post('/pay', routeController.pay);

  //查询订单
  app.get('/findOrder', routeController.findOrder);

  //修改订单状态, 收货
  app.post('/receive', routeController.receive);

  //删除订单
  app.post('/removeOrder', routeController.removeOrder);

  //查询我的
  app.get('/findMy', routeController.findMy);

  //查询账号管理信息
  app.get('/findAccountInfo', routeController.findAccountInfo);

  //修改昵称
  app.post('/updateNickName', routeController.updateNickName);

  //修改简介
  app.post('/updateDesc', routeController.updateDesc);

  //修改密码
  app.post('/updatePassword', routeController.updatePassword);

  //退出登录
  app.post('/logout', routeController.logout);

  //注销账号
  app.post('/destroyAccount', routeController.destroyAccount);

  //上传头像
  app.post('/updateAvatar', routeController.updateAvatar);

  //上传用户背景图
  app.post('/updateUserBg', routeController.updateUserBg);

  //获取邮箱验证码
  app.post('/emailValidCode', routeController.emailValidCode);

  //验证码验证
  app.post('/checkValidCode', routeController.checkValidCode);

  //找回密码
  app.post('/retrievePassword', routeController.retrievePassword);

  //搜索商品
  app.get('/search', routeController.search);

}