const Sequelize = require('sequelize');

const db = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    ssl: true,
    protocol: "postgres",
    logging: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });

module.exports = db;









// const db = new Sequelize(process.env.DB_NAME, 'postgres', process.env.DB_PASS, {
//     host: 'localhost',
//     dialect: 'postgres'
// });

// module.exports = db;