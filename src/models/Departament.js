// src/models/Department.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Department = sequelize.define('Department', {
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  }
},{
  tableName: 'departaments',
});

module.exports = Department;