// // src/models/Tecnic.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Tecnic = sequelize.define('Tecnic', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'usuaris',
      key: 'id'
    }
  },
  especialitat: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'tecnics',
  timestamps: false
});

module.exports = Tecnic;
