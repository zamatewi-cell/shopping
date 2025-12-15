//导入sequelize
let Sequelize = require('sequelize');

//定义模型，类似创建表结构
let Model = Sequelize.Model;

//定义一个商家order数据表结构
class Order extends Model {}

//定义order表结构
Order.init({
  //定义id字段
  id: {
    //字段类型
    //INTEGER: 整型， UNSIGNED: 无符号
    type: Sequelize.INTEGER.UNSIGNED,

    //是否为空
    allowNull: false,

    //自动递增
    autoIncrement: true,

    //主键
    primaryKey: true,

    //注释
    comment: '表的主键id'
  },

  //订单记录的唯一标识
  oid: {
    //STRING: 字符类型, 20个字符
    type: Sequelize.STRING(20),
    allowNull: false,
    //默认值
    defaultValue: '',
    comment: '订单记录的唯一标识'
  },

  //商品pid
  pid: {
    //STRING: 字符类型, 20个字符
    type: Sequelize.STRING(20),
    allowNull: false,
    //默认值
    defaultValue: '',
    comment: '商品id'
  },

  //商品价格
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    //默认值
    defaultValue: 0,
    comment: '商品价格'
  },

  //商品图片
  smallImg: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '',
    comment: '商品小图片'
  },

  //商品名称
  name: {
    type: Sequelize.STRING(120),
    allowNull: false,
    //默认值
    defaultValue: '',
    comment: '商品名称'
  },

  //英文名称
  enname: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '',
    comment: '英文名称'
  },

  //商品数量
  count: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '商品数量'
  },

  //用户唯一id
  userId: {
    type: Sequelize.STRING(18),
    allowNull: false,
    defaultValue: '',
    comment: '用户唯一id'
  },

  //订单状态 0：全部，1：待收货，2：已收货
  status: {
    type: Sequelize.INTEGER(1),
    allowNull: false,
    defaultValue: 1,
    comment: '订单状态 0：全部，1：待收货，2：已收货'
  },

  //是否删除订单, 逻辑删除(假删除)
  isRemove: {
    type: Sequelize.INTEGER(1),
    allowNull: false,
    defaultValue: 0,
    comment: '删除订单状态, 0未删除,1删除'
  },

  //收货地址
  address: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '',
    comment: '收货地址'
  },

  //手机号
  phone: {
    type: Sequelize.STRING(11),
    allowNull: false,
    defaultValue: '',
    comment: '手机号'
  },

  //收货人
  receiver: {
    type: Sequelize.STRING(30),
    allowNull: false,
    defaultValue: '',
    comment: '收货人'
  }

}, {
  //模型名称
  modelName: 'order',

  //多个单词组合字段以_分隔命名
  underscored: true,

  //表的名称, 如果没有定义表名称，则使用模型名称命名为表名称
  tableName: 'order',

  //创建updateAt、createAt字段
  timestamps: true,

  //连接实例
  sequelize

})

//创建order表结构
//force: true, 如果数据表存在，则先删除，再创建
//force: false, 如果数据表不存在，则创建
//Order.sync(): 创建表结构，该方法始终返回一个promise
Order.sync({force: false})

//导出模型
module.exports = Order;