const db = require('./db');
const { DataTypes } = require("sequelize");

const sequelize = db.sequelize;

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'users'
});

// 初始化用户表
(async () => {
  await User.sync({ force: false });
  let admin = await User.findByPk(1);
  if (admin === null) {
    admin = await User.create({ username: "admin", password: "123qwe" });
  }
 })();

module.exports = {
  User
};
