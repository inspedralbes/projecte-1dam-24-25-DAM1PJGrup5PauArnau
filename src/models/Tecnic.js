// // src/models/Tecnic.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Tecnic = sequelize.define('Tecnic', {
 
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'Tecnics',
  timestamps: false
});

module.exports = Tecnic;