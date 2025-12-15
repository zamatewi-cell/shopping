//导入sequelize模块

let Sequelize = require('sequelize');

//创建数据库连接
//server: 数据库名称
//root: 连接数据库名称
//Zrx@060309: 连接数据库密码
module.exports = new Sequelize(config.mysqlOptions.database, config.mysqlOptions.user, config.mysqlOptions.password, {
  //数据库地址
  host: config.mysqlOptions.host,
  //连接数据库类型
  dialect: config.mysqlOptions.dialect,

  //东八区时间，北京标准时间
  timezone: '+08:00'
})