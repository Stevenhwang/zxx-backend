const db = require('./db');
const { DataTypes } = require("sequelize");

const sequelize = db.sequelize;

const MaterialType = sequelize.define('MaterialType', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
    }
  }, {
    tableName: 'material_types'
});

// 初始化
(async () => {
  await MaterialType.sync({ force: false });
 })();

module.exports = {
  MaterialType
};
