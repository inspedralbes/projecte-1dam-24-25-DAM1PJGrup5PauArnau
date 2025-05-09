const express = require('express');
const router = express.Router();
const Incident = require('../models/Incidencia');
const Departament = require('../models/Departament');

// Llistar incidències
router.get('/', async (req, res) => {
  try {
    const incidencies = await Incident.findAll({ include: [{ model: Departament, attributes: ['nom'] }] 
    });
    console.log(incidencies);
    res.render('incidencies/list', { incidencies });
  } catch (error) {
    res.status(500).send('Error al recuperar incidències'+error.message);
  }
});

// Formulari nova incidència
router.get('/new', async (req, res) => {
  const departaments = await Departament.findAll();
  res.render('incidencies/new', { departaments });
});

// Crear incidència
router.post('/create', async (req, res) => {
  try {
    const { descripcio, prioritat, departamentId } = req.body;
    await Incident.create({ descripcio, prioritat, departamentId });
    res.redirect('/incidencies');
  } catch (error) {
    res.status(500).send('Error al crear incidència'+error.message);
  }
});

// Formulari d'edició
router.get('/:id/edit', async (req, res) => {
  try {
    const incident = await Incident.findByPk(req.params.id); // Canviat a "incident"
    const departaments = await Departament.findAll();
    if (!incident) return res.status(404).send('Incidència no trobada');
    res.render('incidencies/_edit', { incident, departaments }); // Canviat a "incident"
  } 
  catch (error) {
    res.status(500).send('Error al carregar el formulari d\'edició: ' + error.message);
  }
});

// Actualitzar incidència
router.post('/:id/update', async (req, res) => {
  try{
    const { priority } = req.body;
    const incidencies = await Incident.findByPk(req.params.id);
    if (!incidencies) return res.status(404).send('Incidència no trobada');
    Object.assign(incidencies, { priority });
    await incidencies.save();
    res.redirect('/incidencies');
  }
  catch (error) {
    res.status(500).send('Error al actualitzar incidència'+error.message);
  }
});

// Eliminar incidència
router.get('/:id/delete', async (req, res) => {
  const incidencies = await Incident.findByPk(req.params.id);
  if (!incidencies) return res.status(404).send('Incidència no trobada');
  await incidencies.destroy();
  res.redirect('/incidencies');
});

module.exports = router;
