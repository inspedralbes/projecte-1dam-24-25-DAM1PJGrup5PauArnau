const express = require('express');
const router = express.Router();
const Incident = require('../models/Incidencia');
const Departament = require('../models/Departament');

// Llistar incidències
router.get('/', async (req, res) => {
  try {
    const incidents = await Incident.findAll({ include: Departament });
    res.render('incidencies/list', { incidents });
  } catch (error) {
    res.status(500).send('Error al recuperar incidències'+error.message);
  }
});

// Formulari nova incidència
router.get('/new', async (req, res) => {
  const departments = await Departament.findAll();
  res.render('incidencies/new', { departments });
});

// Crear incidència
router.post('/create', async (req, res) => {
  try {
    const { description, priority, departmentId } = req.body;
    await Incident.create({ description, priority, departmentId });
    res.redirect('/incidencies');
  } catch (error) {
    res.status(500).send('Error al crear incidència'+error.message);
  }
});

// Formulari d'edició
router.get('/:id/edit', async (req, res) => {
  try{
  const incident = await Incident.findByPk(req.params.id);
  const departments = await Departament.findAll();
  if (!incident) return res.status(404).send('Incidència no trobada');
  res.render('incidencies/edit', { incident, departments });
}
  catch (error) {
    res.status(500).send('Error al carregar el formulari d\'edició'+error.message);
  }
});

// Actualitzar incidència
router.post('/:id/update', async (req, res) => {
  try{
    const { priority } = req.body;
    const incident = await Incident.findByPk(req.params.id);
    if (!incident) return res.status(404).send('Incidència no trobada');
    Object.assign(incident, {  priority });
    await incident.save();
    res.redirect('/incidencies');
  }
  catch (error) {
    res.status(500).send('Error al actualitzar incidència'+error.message);
  }
});

// Eliminar incidència
router.get('/:id/delete', async (req, res) => {
  const incident = await Incident.findByPk(req.params.id);
  if (!incident) return res.status(404).send('Incidència no trobada');
  await incident.destroy();
  res.redirect('/incidencies');
});

module.exports = router;
