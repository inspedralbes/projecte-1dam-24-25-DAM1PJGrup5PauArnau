module.exports = (sequelize, DataTypes) => {
    const TipusIncidencia = sequelize.define('TipusIncidencia', {
      nom: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      tableName: 'tipus_incidencies',
      timestamps: false
    });
  
    TipusIncidencia.associate = models => {
      TipusIncidencia.hasMany(models.Incidencia, { foreignKey: 'tipus_id' });
    };
  
    return TipusIncidencia;
  };
  