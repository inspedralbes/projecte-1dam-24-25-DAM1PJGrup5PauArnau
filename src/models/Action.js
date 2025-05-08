// src/models/Action.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Incident = require('./Incident');  // Importem el model d'Incidència

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
