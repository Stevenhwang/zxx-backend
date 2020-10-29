const db = require('./db');
const { DataTypes } = require("sequelize");

const sequelize = db.sequelize;

const MaterialType = sequelize.define('MaterialType', {
    name: {
      type: DataTypes.STRING,
    }
  }, {
    tableName: 'material_types'
});

const Material = sequelize.define('Material', {
  date: {
    type: DataTypes.DATE
  },
  name: {
    type: DataTypes.STRING
  },
  address: {
    type: DataTypes.STRING
  },
  detail: {
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
  remarks: {
    type: DataTypes.TEXT
  },
}, {
  tableName: 'materials',
  timestamps: false
});

const Change = sequelize.define('Change', {
  date: {
    type: DataTypes.DATE
  },
  name: {
    type: DataTypes.STRING
  },
  address: {
    type: DataTypes.STRING
  },
  detail: {
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
  remarks: {
    type: DataTypes.TEXT
  },
}, {
  tableName: 'changes',
  timestamps: false
});

// 初始化
(async () => {
  await MaterialType.sync({ force: false });
  await Material.sync({ force: false });
  await Change.sync({ force: false })
 })();

module.exports = {
  MaterialType,
  Material,
  Change
};
