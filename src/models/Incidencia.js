// src/models/Incident.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Incident = sequelize.define('Incident', {
  decripcio: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  dataCreacio: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  Resolta: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  Prioritat: {
    type: DataTypes.ENUM('Alta', 'Mitja', 'Baixa'),
    allowNull: true,
  },
});

module.exports = Incident;