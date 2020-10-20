const db = require('./db');
const { DataTypes } = require("sequelize");

const sequelize = db.sequelize

const Payment = sequelize.define('Payment', {
  date: {
    type: DataTypes.DATE
  },
  unit: {
    type: DataTypes.STRING
  },
  product: {
    type: DataTypes.STRING
  },
  amount: {
    type: DataTypes.INTEGER
  },
  paid: {
    type: DataTypes.INTEGER
  },
  balance: {
    type: DataTypes.INTEGER
  },
  remarks: {
    type: DataTypes.TEXT
  },
  name: {
    type: DataTypes.STRING
  },
}, {
  tableName: 'payments',
  timestamps: false
});

const Respay = sequelize.define('Respay', {
  date: {
    type: DataTypes.DATE
  },
  unit: {
    type: DataTypes.STRING
  },
  punit: {
    type: DataTypes.STRING
  },
  project: {
    type: DataTypes.STRING
  },
  collect: {
    type: DataTypes.INTEGER
  },
  amount: {
    type: DataTypes.INTEGER
  },
  balance: {
    type: DataTypes.INTEGER
  },
  remarks: {
    type: DataTypes.TEXT
  },
  name: {
    type: DataTypes.STRING
  },
}, {
  tableName: 'respays',
  timestamps: false
});

// 初始化
(async () => {
  await Payment.sync({ force: false });
  await Respay.sync({ force: false });
 })();

module.exports = {
  Payment,
  Respay
};
