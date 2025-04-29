// src/app.js
const express = require('express');
require('dotenv').config();
const sequelize = require('./db');

const Department = require('./models/Department');  // Departament
const Incident = require('./models/Incident');      // Incidència
const Action = require('./models/Action');          // Actuació

// Relacions
Incident.belongsTo(Department, { foreignKey: 'departmentId', onDelete: 'CASCADE' });
Department.hasMany(Incident, { foreignKey: 'departmentId', onDelete: 'CASCADE' });

// Relació Incidència -> Actuació (Una incidència pot tenir moltes actuacions)
Incident.hasMany(Action, { foreignKey: 'incidentId', onDelete: 'CASCADE' });
Action.belongsTo(Incident, { foreignKey: 'incidentId' });

// Rutes EJS
const incidentRoutesEJS = require('./routes/incidentsEJS.routes');
const departmentRoutesEJS = require('./routes/departamentsEJS.routes');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuració EJS
app.set('view engine', 'ejs');
const path = require('path');
app.set('views', path.join(__dirname, 'views'));

// Rutes EJS
app.use('/incidents', incidentRoutesEJS);
app.use('/departments', departmentRoutesEJS);

// Configurar carpeta estàtica per a servir imatges
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Ruta de prova
app.get('/', async (req, res) => {
  try {
    const incidents = await Incident.findAll({ include: Department });
    res.render('index', { incidents });
  } catch (error) {
    console.error('Error fetching incidents:', error);
    res.render('index', { incidents: [] });
  }
});

const port = process.env.PORT || 3000;  // Aquí està configurat per escoltar al port 3000
app.listen(port, () => {
  console.log(`Servidor escoltant a http://localhost:${port}`);
});


(async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Base de dades sincronitzada (API JSON)');

    // Crear dades d’exemple (departaments i incidències)
    const deptScience = await Department.create({ name: 'Ciències' });
    const deptIT = await Department.create({ name: 'Informàtica' });

    const incident1 = await Incident.create({
      description: 'No funciona la impressora.',
      priority: 'Alta',
      departmentId: deptIT.id,
    });

    const action1 = await Action.create({
      description: 'Reiniciat el servidor de la impressora.',
      timeSpent: 30,
      incidentId: incident1.id,
    });

    // Iniciar servidor
    app.listen(port, () => {
      console.log(`Servidor escoltant a http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error a l'inici:", error);
  }
})();
