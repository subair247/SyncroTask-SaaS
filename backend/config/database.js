const { Sequelize } = require('sequelize');
require('dotenv').config();

// Connect to PostgreSQL using environment variables
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false, 
});

module.exports = sequelize;