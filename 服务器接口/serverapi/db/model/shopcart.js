//导入sequelize
let Sequelize = require('sequelize');

//定义模型，类似创建表结构
let Model = Sequelize.Model;

//定义一个商家shopcart数据表结构
class Shopcart extends Model {}

//定义shopcart表结构
Shopcart.init({
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

  //购物车记录的唯一标识
  sid: {
    //STRING: 字符类型, 20个字符
    type: Sequelize.STRING(20),
    allowNull: false,
    //默认值
    defaultValue: '',
    comment: '购物车记录的唯一标识'
  },

  //定义商品id字段
  pid: {
    //STRING: 字符类型, 20个字符
    type: Sequelize.STRING(20),
    allowNull: false,
    //默认值
    defaultValue: '',
    comment: '商品id'
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

  //商品状态
  status: {
    type: Sequelize.INTEGER(1),
    allowNull: false,
    defaultValue: 0,
    comment: '商品状态, 0未付款,1待收货,2已收货'
  },

  //是否删除商品, 逻辑删除(假删除)
  isRemove: {
    type: Sequelize.INTEGER(1),
    allowNull: false,
    defaultValue: 0,
    comment: '商品状态, 0未删除,1删除'
  }

}, {
  //模型名称
  modelName: 'shopcart',

  //多个单词组合字段以_分隔命名
  underscored: true,

  //表的名称, 如果没有定义表名称，则使用模型名称命名为表名称
  tableName: 'shopcart',

  //创建updateAt、createAt字段
  timestamps: true,

  //连接实例
  sequelize

})

//创建shopcart表结构
Shopcart.sync({force: false})

//导出模型
module.exports = Shopcart;