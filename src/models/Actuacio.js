// src/models/Actuacio.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Actuacio = sequelize.define('Actuacio', {
  descripcio: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  data: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }, 
  temps: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  resolta: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  visible: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});


module.exports = Actuacio;
