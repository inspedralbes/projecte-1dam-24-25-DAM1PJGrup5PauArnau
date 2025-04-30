module.exports = (sequelize, DataTypes) => {
    const Tecnic = sequelize.define('Tecnic', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'usuaris',
          key: 'id'
        }
      },
      especialitat: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      tableName: 'tecnics',
      timestamps: false
    });
  
    Tecnic.associate = models => {
      Tecnic.belongsTo(models.Usuari, { foreignKey: 'id' });
      Tecnic.hasMany(models.Incidencia, { foreignKey: 'tecnic_id' });
      Tecnic.hasMany(models.Actuacio, { foreignKey: 'tecnic_id' });
    };
  
    return Tecnic;
  };
  