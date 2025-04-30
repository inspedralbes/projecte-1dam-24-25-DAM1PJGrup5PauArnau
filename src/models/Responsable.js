module.exports = (sequelize, DataTypes) => {
    const Responsable = sequelize.define('Responsable', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'usuaris',
          key: 'id'
        }
      },
      departament_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'departaments',
          key: 'id'
        }
      }
    }, {
      tableName: 'responsables',
      timestamps: false
    });
  
    Responsable.associate = models => {
      Responsable.belongsTo(models.Usuari, { foreignKey: 'id' });
      Responsable.belongsTo(models.Departament, { foreignKey: 'departament_id' });
    };
  
    return Responsable;
  };
  