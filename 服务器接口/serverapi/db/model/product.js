//导入sequelize
let Sequelize = require('sequelize');

//定义模型，类似创建表结构
let Model = Sequelize.Model;

//定义一个商家product数据表结构
class Product extends Model {}

//定义product表结构
Product.init({
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

  //定义商品id字段
  pid: {
    //STRING: 字符类型, 20个字符
    type: Sequelize.STRING(20),
    allowNull: false,
    //默认值
    defaultValue: '',
    comment: '商品id'
  },

  //类型id
  typeId: {
    type: Sequelize.STRING(18),
    allowNull: false,
    defaultValue: '',
    comment: '商品类型id'
  },

  //商品名称
  name: {
    type: Sequelize.STRING(120),
    allowNull: false,
    //默认值
    defaultValue: '',
    comment: '商品名称'
  },

  //商品价格
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    //默认值
    defaultValue: 0,
    comment: '商品价格'
  },

  //商品详情描述
  desc: {
    type: Sequelize.STRING,
    allowNull: false,
    //默认值
    defaultValue: '',
    comment: '商品描述'
  },

  //商品图片
  smallImg: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '',
    comment: '商品小图片'
  },

  //商品图片
  largeImg: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '',
    comment: '商品大图片'
  },

  //商品标志,例如：上新、热卖、新品、时令、...
  flag: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '',
    comment: '商品标志'
  },

  //英文名称
  enname: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '',
    comment: '英文名称'
  }

}, {
  //模型名称
  modelName: 'product',

  //多个单词组合字段以_分隔命名
  underscored: true,

  //表的名称, 如果没有定义表名称，则使用模型名称命名为表名称
  tableName: 'product',

  //创建updateAt、createAt字段
  timestamps: true,

  //连接实例
  sequelize

})

//创建product表结构
Product.sync({force: false});

//导出模型
module.exports = Product;