// src/db.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
  }
);
sequelize.authenticate()
  .then(() => console.log('✅ Connexió amb la base de dades establerta correctament.'))
  .catch((error) => console.error('❌ Error connectant amb la base de dades:', error));
module.exports = sequelize;