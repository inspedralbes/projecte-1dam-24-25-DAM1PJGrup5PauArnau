const express = require('express');
require('dotenv').config();
const path = require('path');
const sequelize = require('./db');

// Models
const Department = require('./models/Department');
const Incident = require('./models/Incident');
const Action = require('./models/Action');
const Usuari = require('./models/Usuari');
const Tecnic = require('./models/Tecnic');

// Relacions

// Incidència i Accions
Incident.hasMany(Action, { foreignKey: 'incidentId', onDelete: 'CASCADE' });
Action.belongsTo(Incident, { foreignKey: 'incidentId' });

// Usuari i Incidència
Usuari.hasMany(Incident, { foreignKey: 'usuari_id', onDelete: 'CASCADE' });
Incident.belongsTo(Usuari, { foreignKey: 'usuari_id', onDelete: 'CASCADE' });

// Tecnic i Incidència (assignació)
Tecnic.hasMany(Incident, { foreignKey: 'tecnic_id', onDelete: 'CASCADE' });
Incident.belongsTo(Tecnic, { foreignKey: 'tecnic_id', onDelete: 'CASCADE' });

// Tecnic i Accions
Tecnic.hasMany(Action, { foreignKey: 'tecnic_id' });
Action.belongsTo(Tecnic, { foreignKey: 'tecnic_id' });

// Usuari i Tecnic
Usuari.hasOne(Tecnic, { foreignKey: 'usuariId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Tecnic.belongsTo(Usuari, { foreignKey: 'usuariId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Incident.belongsTo(Department, { foreignKey: 'departmentId', onDelete: 'CASCADE' });
Department.hasMany(Incident, { foreignKey: 'departmentId', onDelete: 'CASCADE' });

// Inicialització d’Express
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Motor de plantilles
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Rutes
const usuarisRoutes = require('./routes/usuarisEJS.routes');
const incidentRoutesEJS = require('./routes/incidentsEJS.routes');
const adminRoutes = require('./routes/adminEJS.routes');

// Altres rutes...
app.use('/admin', adminRoutes);
app.use('/usuaris', usuarisRoutes);
app.use('/incidencies', incidentRoutesEJS);

// Ruta principal
app.get('/', async (req, res) => {
  try {
    const incidents = await Incident.findAll({ include: [Department, Tecnic, Usuari] });
    res.render('index', { incidents });
  } catch (error) {
    console.error('Error carregant les incidències:', error.message);
    res.render('index', { incidents: [] });
  }
});

// Port
const port = process.env.PORT ||3000;

// Sync DB i iniciar servidor
(async () => {
  try {
    await sequelize.sync({ force: true }); // Força la recreació de totes les taules
    console.log('📦 Taules creades correctament');

    Department.create({
      name: 'Matemàtiques',	
      
    });
    Department.create({
      name: 'Informàtica',	
      
    });


    app.listen(port, () => {
      console.log(`🚀 Servidor escoltant a http://localhost:${port}`);
    });
  } catch (error) {
    console.error("❌ Error inicialitzant l'aplicació:", error);
  }
})();
