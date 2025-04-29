// src/models/Incident.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Department = require('./Department');  // Importem el model de Departament

const Incident = sequelize.define('Incident', {
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  creationDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  isResolved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  priority: {
    type: DataTypes.ENUM('Alta', 'Mitja', 'Baixa'),
    allowNull: false,
  },
});

// Relació amb Departament (una incidència pot ser de diversos departaments)
Incident.belongsTo(Department, { foreignKey: 'departmentId', onDelete: 'CASCADE' });

module.exports = Incident;