//导入sequelize
let Sequelize = require('sequelize');

//定义模型，类似创建表结构
let Model = Sequelize.Model;

//定义一个商家validcode数据表结构
class Validcode extends Model {}

//定义validcode表结构
Validcode.init({
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

  //验证码
  code: {
    //STRING: 字符类型, 30个字符
    type: Sequelize.STRING(30),
    allowNull: false,
    //默认值
    defaultValue: '',
    comment: '验证码'
  },

  //邮箱
  email: {
    //STRING: 字符类型, 50个字符
    type: Sequelize.STRING(50),
    allowNull: false,
    //默认值
    defaultValue: '',
    comment: '邮箱'
  },
  
  //是否过期
  isRemove: {
    type: Sequelize.INTEGER(1),
    allowNull: false,
    defaultValue: 0,
    comment: '0未过期，1过期'
  }

}, {
  //模型名称
  modelName: 'validcode',

  //多个单词组合字段以_分隔命名
  underscored: true,

  //表的名称, 如果没有定义表名称，则使用模型名称命名为表名称
  tableName: 'validcode',

  //创建updateAt、createAt字段
  timestamps: true,

  //连接实例
  sequelize

})

//创建validcode表结构
//force: true, 如果数据表存在，则先删除，再创建
//force: false, 如果数据表不存在，则创建
//Validcode.sync(): 创建表结构，该方法始终返回一个promise
Validcode.sync({force: false})

//导出模型
module.exports = Validcode;