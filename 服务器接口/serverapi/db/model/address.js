//导入sequelize
let Sequelize = require('sequelize');

//定义模型，类似创建表结构
let Model = Sequelize.Model;

//定义一个商家address数据表结构
class Address extends Model {}

//定义address表结构
Address.init({
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

  //地址唯一aid
  aid: {
    type: Sequelize.STRING(30),
    allowNull: false,
    defaultValue: '',
    comment: '地址唯一aid'
  },

  //用户唯一id
  userId: {
    type: Sequelize.STRING(18),
    allowNull: false,
    defaultValue: '',
    comment: '用户唯一id'
  },

  //收货人
  receiver: {
    type: Sequelize.STRING(18),
    allowNull: false,
    defaultValue: '',
    comment: '收货人'
  },

  //手机号
  phone: {
    type: Sequelize.STRING(11),
    allowNull: false,
    defaultValue: '',
    comment: '手机号'
  },

  //收获地址
  addressDetail: {
    type: Sequelize.STRING(100),
    allowNull: false,
    defaultValue: '',
    comment: '收获地址'
  },

  //默认地址
  isDefault: {
    type: Sequelize.INTEGER(1),
    allowNull: false,
    defaultValue: 0,
    comment: '0不是默认地址，1默认地址'
  },

  //删除地址，逻辑删除
  isRemove: {
    type: Sequelize.INTEGER(1),
    allowNull: false,
    defaultValue: 0,
    comment: '0没有删除，1删除'
  }


}, {
  //模型名称
  modelName: 'address',

  //多个单词组合字段以_分隔命名
  underscored: true,

  //表的名称, 如果没有定义表名称，则使用模型名称命名为表名称
  tableName: 'address',

  //创建updateAt、createAt字段
  timestamps: true,

  //连接实例
  sequelize

})

//创建address表结构
//force: true, 如果数据表存在，则先删除，再创建
//force: false, 如果数据表不存在，则创建
//Address.sync(): 创建表结构，该方法始终返回一个promise
Address.sync({force: false});

//导出模型
module.exports = Address;