const db = require('./db');
const { DataTypes } = require("sequelize");

const sequelize = db.sequelize

const Cancellation = sequelize.define('Cancellation', {
  date: {
    type: DataTypes.DATE
  },
  number: {
    type: DataTypes.INTEGER
  },
  company: {
    type: DataTypes.STRING
  },
  project: {
    type: DataTypes.STRING
  },
  product: {
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
  should: {
    type: DataTypes.INTEGER
  },
  completed: {
    type: DataTypes.INTEGER
  },
  nodone: {
    type: DataTypes.VIRTUAL,
    get () {
      return this.should - this.completed
    }
  },
  person: {
    type: DataTypes.STRING
  },
  name: {
    type: DataTypes.STRING
  },
  remarks: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'cancellations',
  timestamps: false
});

const Entryticket = sequelize.define('Entryticket', {
    date: {
        type: DataTypes.DATE
    },
    number: {
        type: DataTypes.STRING
    },
    product: {
        type: DataTypes.STRING
    },
    quantity: {
        type: DataTypes.INTEGER
    },
    unit: {
        type: DataTypes.STRING
    },
    should: {
        type: DataTypes.INTEGER
    },
    completed: {
        type: DataTypes.INTEGER
    },
    nodone: {
        type: DataTypes.VIRTUAL,
        get () {
          return this.should - this.completed
        }
    },
    deduction: {
        type: DataTypes.INTEGER
    },
    person: {
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING
    },
    remarks: {
        type: DataTypes.TEXT
    }
}, {
  tableName: 'entrytickets',
  timestamps: false
});

// 初始化
(async () => {
  await Cancellation.sync({ force: false });
  await Entryticket.sync({ force: false });
 })();

module.exports = {
  Cancellation,
  Entryticket
};
