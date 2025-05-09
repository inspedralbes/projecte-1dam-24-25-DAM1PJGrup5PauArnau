// // src/models/Usuari.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Usuari = sequelize.define('Usuari', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cognoms: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  contrasenya: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rol: {
    type: DataTypes.ENUM('usuari', 'tecnic', 'admin'),
    allowNull: false
  }
}, {
  tableName: 'usuaris',
  timestamps: false
});

module.exports = Usuari;
