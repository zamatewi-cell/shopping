//导入sequelize
let Sequelize = require('sequelize');

//定义模型，类似创建表结构
let Model = Sequelize.Model;

//定义一个商家type数据表结构
class Type extends Model {}

//定义type表结构
Type.init({
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

  //类型id
  typeId: {
    type: Sequelize.STRING(18),
    allowNull: false,
    defaultValue: '',
    comment: '商品类型id'
  },

  //类型名称
  type: {
    //STRING: 字符类型
    type: Sequelize.STRING(20),
    allowNull: false,
    //默认值
    defaultValue: '',
    comment: '类型名称'
  },

  //商家用户id
  bUserId: {
    type: Sequelize.STRING(18),
    allowNull: false,
    defaultValue: '',
    comment: '商家用户id'
  }

}, {
  //模型名称
  modelName: 'type',

  //多个单词组合字段以_分隔命名
  underscored: true,

  //表的名称, 如果没有定义表名称，则使用模型名称命名为表名称
  tableName: 'type',

  //创建updateAt、createAt字段
  timestamps: true,

  //连接实例
  sequelize

})

//创建type表结构
Type.sync({force: false})

//导出模型
module.exports = Type;