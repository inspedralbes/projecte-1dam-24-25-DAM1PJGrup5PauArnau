// src/models/Action.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Action = sequelize.define('Action', {
  descripcio: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  data: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  Resolta: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});


module.exports = Action;
