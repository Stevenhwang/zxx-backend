const db = require('./db');
const { DataTypes } = require("sequelize");

const sequelize = db.sequelize

const ProductType = sequelize.define('ProductType', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
    }
  }, {
    tableName: 'product_types'
});

// 初始化
(async () => {
  await ProductType.sync({ force: false });
 })();

module.exports = {
  ProductType
};
