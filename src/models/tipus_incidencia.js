// src/models/tipus_incidencia.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const tipus_incidencia = sequelize.define('tipus_incidencia', {
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'tipus_incidencies',
  timestamps: false
});

module.exports = tipus_incidencia;
