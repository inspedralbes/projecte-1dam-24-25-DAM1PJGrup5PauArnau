// src/models/Responsable.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Responsable = sequelize.define('Responsable', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'usuaris',
      key: 'id'
    }
  },
  departament_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'departaments',
      key: 'id'
    }
  }
}, {
  tableName: 'responsables',
  timestamps: false
});

module.exports = Responsable;
