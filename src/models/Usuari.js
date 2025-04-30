module.exports = (sequelize, DataTypes) => {
    const Usuari = sequelize.define('Usuari', {
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
        type: DataTypes.ENUM('usuari', 'tecnic', 'responsable', 'admin'),
        allowNull: false
      }
    }, {
      tableName: 'usuaris',
      timestamps: false
    });
  
    Usuari.associate = models => {
      Usuari.hasOne(models.Tecnic, { foreignKey: 'id' });
      Usuari.hasOne(models.Responsable, { foreignKey: 'id' });
      Usuari.hasMany(models.Incidencia, { foreignKey: 'usuari_id' });
    };
  
    return Usuari;
  };
  