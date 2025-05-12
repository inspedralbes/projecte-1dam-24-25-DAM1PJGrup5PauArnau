const express = require('express');
require('dotenv').config();
const path = require('path');
const sequelize = require('./db');

// Models
const Departament = require('./models/Departament');
const Incident = require('./models/Incidencia');
const Actuacio = require('./models/Actuacio');
const Tecnic = require('./models/Tecnic');

// Relacions

// Incidència i Accions
Incident.hasMany(Actuacio, { foreignKey: 'incidentid', onDelete: 'CASCADE' });
Actuacio.belongsTo(Incident, { foreignKey: 'incidentid' });

// Tecnic i Incidència (assignació)
Tecnic.hasMany(Incident, { foreignKey: 'tecnic_id', onDelete: 'CASCADE' });
Incident.belongsTo(Tecnic, { foreignKey: 'tecnic_id', onDelete: 'CASCADE' });

// Tecnic i Accions
Tecnic.hasMany(Actuacio, { foreignKey: 'tecnic_id' });
Actuacio.belongsTo(Tecnic, { foreignKey: 'tecnic_id' });

// Incident i Departament
Incident.belongsTo(Departament, { foreignKey: 'departamentId', onDelete: 'CASCADE' });
Departament.hasMany(Incident, { foreignKey: 'departamentId', onDelete: 'CASCADE' });

Actuacio.belongsTo(Departament, { foreignKey: 'departamentId', as: 'Departament' });

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
const incidentRoutesEJS = require('./routes/incidentsEJS.routes');
const adminRoutes = require('./routes/adminEJS.routes');
const departamentsRoutes = require('./routes/departamentsEJS.routes');
<<<<<<< HEAD
const actionsRoutes = require('./routes/actuacionsEJS.routes');

// Rutes
app.get('/', async (req, res) => {
  try {
    const incidencies = await Incident.findAll({
      include: [{ model: Departament, attributes: ['nom'] }], // Inclou el departament associat
    });
    const departaments = await Departament.findAll({ attributes: ['id', 'nom'] }); // Carrega els departaments
    res.render('index', { incidencies, departaments }); // Passa les incidències a la vista
  } catch (error) {
    console.error('Error carregant les incidències:', error.message);
    res.status(500).send('Error carregant les incidències');
  }
=======
app.get('/', (req, res) => {
  res.render('index'); // Renderiza la vista `index.ejs`
>>>>>>> ea8027e2ae20956feb1a5dc10302dbe9b6054167
});

// Altres rutes...
app.use('/admin', adminRoutes);
app.use('/incidencies', incidentRoutesEJS);
app.use('/departaments', departamentsRoutes);
app.use('/actuacions', actionsRoutes);

// Ruta principal
app.get('/incidencies', async (req, res) => {
  try {
    const incidencies = await Incident.findAll({ include: Departament }); // Asegúrate de que `id` esté incluido
    res.render('incidencies/list', { incidencies });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error carregant les incidències');
  }
});
app.get('/incidencies/:id/edit', async (req, res) => {
  try {
    const incidencia = await Incident.findByPk(req.params.id, { include: Departament });
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
 
    //  const inc1 = Incident.create({nom:"JOAN"}); 

    app.listen(port, () => {
      console.log(`🚀 Servidor escoltant a http://localhost:${port}`);
    });
  } catch (error) {
    console.error("❌ Error inicialitzant l'aplicació:", error);
  }
})();
