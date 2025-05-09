// src/models/Incident.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Incident = sequelize.define('Incident', {
  descripcio: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  dataCreacio: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  resolta: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  prioritat: {
    type: DataTypes.ENUM('Alta', 'Mitjana', 'Baixa'),
    allowNull: true,
  },
});

module.exports = Incident;