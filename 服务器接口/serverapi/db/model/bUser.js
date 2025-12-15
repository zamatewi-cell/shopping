//导入sequelize
let Sequelize = require('sequelize');

//定义模型，类似创建表结构
let Model = Sequelize.Model;

let personImgUrl = config.serverOptions.hostname + '/assets/'

class BUser extends Model { }

//定义b_user表结构
BUser.init({
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

  //商家用户id
  bUserId: {
    type: Sequelize.STRING(18),
    allowNull: false,
    defaultValue: '',
    comment: '商家用户id'
  },

  //商家用户手机号
  phone: {
    type: Sequelize.STRING(11),
    allowNull: false,
    comment: '商家用户手机号',
    defaultValue: ''
  },

  //商家用户密码
  password: {
    type: Sequelize.STRING(32),
    allowNull: false,
    defaultValue: '',
    comment: '商家用户密码'
  },

  //商家用户头像
  userImg: {
    //STRING: 字符类型
    type: Sequelize.STRING,
    allowNull: false,
    //默认值
    defaultValue: personImgUrl + 'default.png',
    comment: '商家用户头像'
  },

  //是否注销
  isRemove: {
    type: Sequelize.INTEGER(1),
    allowNull: false,
    defaultValue: 0,
    comment: '0未注销，1注销'
  },

    //是否登录
  isLogin: {
    type: Sequelize.INTEGER(1),
    allowNull: false,
    defaultValue: 0,
    comment: '0未登录，1登录'
  }

}, {

  //多个单词组合字段以_分隔命名
  underscored: true,

  //表的名称, 如果没有定义表名称，则使用模型名称命名为表名称
  tableName: 'b_user',

  //创建updateAt、createAt字段
  timestamps: true,

  //连接实例
  sequelize

})

BUser.sync({ force: false });

//导出模型
module.exports = BUser;