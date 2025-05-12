const express = require('express');
const router = express.Router();
const Incident = require('../models/Incidencia');
const Departament = require('../models/Departament');
const Tecnic = require('../models/Tecnic');

// Llistar incidències
router.get('/', async (req, res) => {
  try {
    const incidencies = await Incident.findAll({
      include: [
        { model: Departament, attributes: ['nom'] },
        { model: Tecnic, attributes: ['nom'] } // <-- aquí afegim el tècnic
      ]
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
    // Carrega la incidència específica
    const incidencia = await Incident.findByPk(req.params.id, { include: Departament });
    if (!incidencia) {
      return res.status(404).send('Incidència no trobada');
    }

    // Carrega totes les incidències (si calen a la vista)
    const incidencies = await Incident.findAll({ include: Departament });

    // Passa la incidència i la llista d'incidències a la vista
    res.render('incidencies/edit', { incidencia, incidencies });
  } catch (error) {
    console.error('Error carregant la incidència:', error.message);
    res.status(500).send('Error carregant la incidència');
  }
});

// Actualitzar incidència
router.post('/:id/update', async (req, res) => {
  try {
    const { prioritat, departmentId, tecnicId } = req.body;

    // Actualitza la incidència a la base de dades
    await Incident.update(
      { prioritat, departmentId, tecnic_id: tecnicId },
      { where: { id: req.params.id } }
    );

    // Redirigeix a la llista d'incidències
    res.redirect('/incidencies');
  } catch (error) {
    console.error('Error actualitzant la incidència:', error.message);
    res.status(500).send('Error actualitzant la incidència');
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
