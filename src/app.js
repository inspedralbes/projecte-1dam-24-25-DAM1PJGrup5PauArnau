const express = require('express');
require('dotenv').config();
const path = require('path');
const sequelize = require('./db');

// Models
const Departament = require('./models/Departament');
const Incident = require('./models/Incidencia');
const Actuacio = require('./models/Actuacio');
const Usuari = require('./models/Usuari');
const Tecnic = require('./models/Tecnic');

// Relacions

// Incidència i Accions
Incident.hasMany(Actuacio, { foreignKey: 'incidentid', onDelete: 'CASCADE' });
Actuacio.belongsTo(Incident, { foreignKey: 'incidentid' });

// Usuari i Incidència
Usuari.hasMany(Incident, { foreignKey: 'usuari_id', onDelete: 'CASCADE' });
Incident.belongsTo(Usuari, { foreignKey: 'usuari_id', onDelete: 'CASCADE' });

// Tecnic i Incidència (assignació)
Tecnic.hasMany(Incident, { foreignKey: 'tecnic_id', onDelete: 'CASCADE' });
Incident.belongsTo(Tecnic, { foreignKey: 'tecnic_id', onDelete: 'CASCADE' });

// Tecnic i Accions
Tecnic.hasMany(Actuacio, { foreignKey: 'tecnic_id' });
Actuacio.belongsTo(Tecnic, { foreignKey: 'tecnic_id' });

// Usuari i Tecnic
Usuari.hasOne(Tecnic, { foreignKey: 'usuariId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Tecnic.belongsTo(Usuari, { foreignKey: 'usuariId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Incident.belongsTo(Departament, { foreignKey: 'departamentId', onDelete: 'CASCADE' });
Departament.hasMany(Incident, { foreignKey: 'departamentId', onDelete: 'CASCADE' });

// Inicialització d’Express
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

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
app.get('/incidencies', async (req, res) => {
  try {
    const incidencies = await Incidencia.findAll({ include: Departament }); // Asegúrate de que `id` esté incluido
    res.render('incidencies/list', { incidencies });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error carregant les incidències');
  }
});
app.get('/incidencies/:id/edit', async (req, res) => {
  try {
    const incidencia = await Incidencia.findByPk(req.params.id, { include: Departament });
    if (!incidencia) {
      return res.status(404).send('Incidència no trobada');
    }
    res.render('incidencies/edit', { incidencia });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error carregant la incidència');
  }
});

// Port
const port = process.env.PORT ||3000;

// Sync DB i iniciar servidor
(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('📦 Taules creades correctament');

    const tec1 = Tecnic.create({nom:"ALVARO"});
    const tec2 = Tecnic.create({nom:"JOAN"}); 
 
    //  const inc1 = Incident.create({nom:"JOAN"}); 

    app.listen(port, () => {
      console.log(`🚀 Servidor escoltant a http://localhost:${port}`);
    });
  } catch (error) {
    console.error("❌ Error inicialitzant l'aplicació:", error);
  }
})();
