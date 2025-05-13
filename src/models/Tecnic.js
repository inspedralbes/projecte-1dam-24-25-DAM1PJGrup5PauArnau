// // src/models/Tecnic.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Tecnic = sequelize.define('Tecnic', {
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  }, especialitat: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Tecnic;