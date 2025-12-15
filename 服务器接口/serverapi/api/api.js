//操作数据api

class API {

  //添加记录
  createData(modelName, o, t) {
    //modelName: 模型 string
    //o: 写入数据 object
    //t: 事务对象
    return Model[modelName].create(o, {transaction: t});
  }

  //查询数据
  findData(modelName, condition, attributes) {
    //modelName：模型, string
    //condition: 查询条件, object
    //attributes: 查询字段, array
    return Model[modelName].findAll({

      //condition: 查询条件, object
      where: condition,

      //attributes: 查询字段, array
      attributes
    });
  }

  //更新数据
  updateData(modelName, attributeValues, condition, t) {
    //modelName: 模型名称, string
    //attributeValues：修改属性值，类型object
    //condition: 条件， 类型object
    //t: 事务处理对象
    return Model[modelName].update(attributeValues, {
      where: condition
    }, {transaction: t});
  }

  //删除数据
  destroyData(modelName, condition) {
    //modelName: 模型名称, 类型string
    //condition: 条件， 类型object
    return Model[modelName].destroy(
      {
        where: condition
      }
    );
  }

  //分页查询，查询符合条件的所有记录数和记录数据
  findPaginationData(modelName, condition, offset, limit) {
    //modelName: 模型名称
    //condition: 查询条件
    //offset: 偏移到第几条数据开始查询,必须为number的数字
    //limit: 查询记录数量, 必须为number的数字
    return Model[modelName].findAndCountAll({
      where: condition,
      offset,
      limit
    })
  }


  //查询满足条件的所有记录数量
  countData(modelName, condition) {
    return Model[modelName].count({
      where: condition
    });
  }

  //计算总和(比如购物车商品数量)
  sumData(modelName, field, condition) {
    //modelName: 模型名称，string
    //field: 求和字段，string,
    //condition: 条件，object

    return Model[modelName].sum(field, {
      where: condition
    });
  }

  //原始查询
  queryData(sql, o) {
    //sql: 原生sql语句
    //o: 原生sql语句预处理对象
    return sequelize.query(sql, {
      bind: o,
      type: sequelize.QueryTypes.SELECT
    })
  }

  //事务处理，当执行两条sql语句或者两条以上，可能需要用到事务处理（添加数据、更改数据、删除数据）
  transaction(fn) {
    return sequelize.transaction(fn);
  }

}

module.exports = new API();