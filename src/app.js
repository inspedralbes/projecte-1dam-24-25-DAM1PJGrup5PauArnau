const express = require('express');
require('dotenv').config();
const path = require('path');
const session = require('express-session');
const sequelize = require('./db');
const mongoose = require('mongoose');

// Models
const Departament = require('./models/Departament');
const Incident = require('./models/Incidencia');
const Actuacio = require('./models/Actuacio');
const Tecnic = require('./models/Tecnic');

// Relacions
Incident.hasMany(Actuacio, { foreignKey: 'incidentid', onDelete: 'CASCADE' });
Actuacio.belongsTo(Incident, { foreignKey: 'incidentid' });

Tecnic.hasMany(Incident, { foreignKey: 'tecnic_id', onDelete: 'CASCADE' });
Incident.belongsTo(Tecnic, { foreignKey: 'tecnic_id', onDelete: 'CASCADE' });

Tecnic.hasMany(Actuacio, { foreignKey: 'tecnic_id' });
Actuacio.belongsTo(Tecnic, { foreignKey: 'tecnic_id' });

Incident.belongsTo(Departament, { foreignKey: 'departamentId', onDelete: 'CASCADE' });
Departament.hasMany(Incident, { foreignKey: 'departamentId', onDelete: 'CASCADE' });

// Inicialització d’Express
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Inicialització de la sessió (abans d'accedir a req.session)
app.use(session({
  secret: process.env.SESSION_SECRET || 'clau-secreta',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // true si tens HTTPS
}));

// Middleware per tenir user accessible a EJS
app.use((req, res, next) => {
  res.locals.user = req.session?.user || null;
  next();
});

// Motor de plantilles
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Rutes
const incidentRoutesEJS = require('./routes/incidentsEJS.routes');
const adminRoutes = require('./routes/adminEJS.routes');
const departamentsRoutes = require('./routes/departamentsEJS.routes');
const actionsRoutes = require('./routes/actuacionsEJS.routes');
const tecnicsRoutes = require('./routes/tecnicsEJS.routes');

// Rutes específiques
app.use('/admin', adminRoutes);
app.use('/incidencies', incidentRoutesEJS);
app.use('/departaments', departamentsRoutes);
app.use('/actuacions', actionsRoutes);
app.use('/tecnics', tecnicsRoutes);

// Ruta principal
app.get('/', async (req, res) => {
  try {
    const incidencies = await Incident.findAll({
      include: [
        { model: Departament, attributes: ['nom'] },
        {
          model: Actuacio,
          include: [{ model: Tecnic, attributes: ['nom'] }],
          order: [['createdAt', 'DESC']]
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    const departaments = await Departament.findAll({ attributes: ['id', 'nom'] });

    res.render('index', { incidencies, departaments, createdId: req.query.createdId  });
  } catch (error) {
    console.error('Error carregant les incidències:', error.message);
    res.status(500).send('Error carregant les incidències');
  }
});

app.get('/incidencies', async (req, res) => {
  try {
    const incidencies = await Incident.findAll({ include: Departament });
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
const port = process.env.PORT || 3000;

// Sync DB i iniciar servidor
(async () => {
  try {
    await sequelize.sync({ alter: false });
    console.log('📦 Taules creades correctament');

    app.listen(port, () => {
      console.log(`🚀 Servidor escoltant a http://localhost:${port}`);
    });
  } catch (error) {
    console.error("❌ Error inicialitzant l'aplicació:", error);
  }
})();

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGO_URI; 

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Connexió amb MongoDB Atlas establerta!");
  } finally {
    await client.close();
  }
}

run().catch(console.error);

const logMiddleware = require('./middlewares/logMiddleware');
const logRoutes = require('./routes/logs')
app.use('/admin', logRoutes);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(logMiddleware);

app.get('/', (req, res) => {
  res.send(`<h1>Inici</h1><a href="/logs">Veure Logs</a>`);
});

app.use(logRoutes);

// 🔌 Connexió MongoDB amb Mongoose
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Connectat a MongoDB Atlas!'))
  .catch(err => console.error('❌ Error connectant a MongoDB:', err));