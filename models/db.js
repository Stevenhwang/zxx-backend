const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize({
//     dialect: 'sqlite',
//     storage: './database.sqlite'
// });

const sequelize = new Sequelize('database', 'username', 'password',  {
    host: 'localhost',
    port:'3306',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
});

module.exports = {
    sequelize
};
