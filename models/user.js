const db = require('./db');
const { DataTypes } = require("sequelize");

const sequelize = db.sequelize;

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    usename: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'users'
});

(async () => {
  User.sync({ force: true });
 })();

module.exports = {
  User
};
