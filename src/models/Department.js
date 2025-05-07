// src/models/Department.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Department = sequelize.define('Department', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  }
},{
  tableName: 'departaments',
});

module.exports = Department;