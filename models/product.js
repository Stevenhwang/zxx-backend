const db = require('./db');
const { DataTypes } = require("sequelize");

const sequelize = db.sequelize

const ProductType = sequelize.define('ProductType', {
    name: {
      type: DataTypes.STRING,
    }
  }, {
    tableName: 'product_types'
});

const Sale = sequelize.define('Sale', {
  date: {
    type: DataTypes.DATE
  },
  name: {
    type: DataTypes.STRING
  },
  project: {
    type: DataTypes.STRING
  },
  product: {
    type: DataTypes.STRING
  },
  docnum: {
    type: DataTypes.STRING
  },
  price: {
    type: DataTypes.INTEGER
  },
  quantity: {
    type: DataTypes.INTEGER
  },
  unit: {
    type: DataTypes.STRING
  },
  amount: {
    type: DataTypes.VIRTUAL,
    get () {
      return this.price * this.quantity
    }
  },
  driver: {
    type: DataTypes.STRING
  },
  remarks: {
    type: DataTypes.TEXT
  },
}, {
  tableName: 'sales',
  timestamps: false
});

const Refund = sequelize.define('Refund', {
  date: {
    type: DataTypes.DATE
  },
  name: {
    type: DataTypes.STRING
  },
  project: {
    type: DataTypes.STRING
  },
  product: {
    type: DataTypes.STRING
  },
  docnum: {
    type: DataTypes.STRING
  },
  price: {
    type: DataTypes.INTEGER
  },
  quantity: {
    type: DataTypes.INTEGER
  },
  unit: {
    type: DataTypes.STRING
  },
  amount: {
    type: DataTypes.VIRTUAL,
    get () {
      return this.price * this.quantity
    }
  },
  driver: {
    type: DataTypes.STRING
  },
  remarks: {
    type: DataTypes.TEXT
  },
}, {
  tableName: 'refunds',
  timestamps: false
});

// 初始化
(async () => {
  await ProductType.sync({ force: false });
  await Sale.sync({ force: false });
  await Refund.sync({ force: false });
 })();

module.exports = {
  ProductType,
  Sale,
  Refund
};
