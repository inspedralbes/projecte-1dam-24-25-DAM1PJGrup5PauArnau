// src/models/Action.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Incident = require('./Incident');  // Importem el model d'Incidència

const Action = sequelize.define('Action', {
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  visibleToUser: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  isResolved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});


module.exports = Action;
