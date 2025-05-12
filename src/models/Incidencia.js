// src/models/Incident.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Incident = sequelize.define('Incident', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  descripcio: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  dataCreacio: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
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