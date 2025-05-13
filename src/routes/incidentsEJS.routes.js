const express = require('express');
const router = express.Router();
const Incident = require('../models/Incidencia');
const Departament = require('../models/Departament');
const Tecnic = require('../models/Tecnic');

// Llistar incidències
router.get('/', async (req, res) => {
  try {
    // Carrega totes les incidències amb el departament i el tècnic associats
    const incidencies = await Incident.findAll({
      include: [
        { model: Departament, attributes: ['nom'] },
        { model: Tecnic, attributes: ['id', 'nom'] },
      ],
    });

    // Carrega tots els tècnics per al desplegable
    const tecnics = await Tecnic.findAll({ attributes: ['id', 'nom'] });

    // Renderitza la vista amb les dades
    res.render('incidencies/list', { incidencies, tecnics });
  } catch (error) {
    console.error('Error carregant les incidències:', error.message);
    res.status(500).send('Error carregant les incidències');
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
    const { descripcio, prioritat, departmentId } = req.body;
    // Comprova que el departament existeix
    const departament = await Departament.findByPk(departmentId);
    if (!departament) {
      return res.status(404).send('Departament no trobat');
    }
    // Crea la incidència amb el departament associat
    await Incident.create({
      descripcio,
      prioritat,
      departamentId: departmentId, // Guarda la ID del departament
    });
    res.redirect('/incidencies');
  } catch (error) {
    console.error('Error creant la incidència:', error.message);
    res.status(500).send('Error creant la incidència');
  }
});

// Formulari d'edició
router.get('/:id/edit', async (req, res) => {
  try {
    const incidencia = await Incident.findByPk(req.params.id, {
      include: [
        { model: Departament, attributes: ['nom'] },
        { model: Tecnic, attributes: ['id', 'nom'] },
      ],
    });

    const tecnics = await Tecnic.findAll({ attributes: ['id', 'nom'] });

    res.render('incidencies/edit', { incidencia, tecnics });
  } catch (error) {
    console.error('Error carregant la incidència:', error.message);
    res.status(500).send('Error carregant la incidència');
  }
});

// Actualitzar incidència
router.post('/:id/update', async (req, res) => {
  try {
    let { prioritat, tecnicId } = req.body;

    // Si tecnicId és buit, assigna NULL
    tecnicId = tecnicId === '' ? null : tecnicId;

    // Actualitza la incidència a la base de dades
    await Incident.update(
      { prioritat, tecnic_id: tecnicId },
      { where: { id: req.params.id } }
    );

    // Redirigeix a la llista d'incidències
    res.redirect('/incidencies');
  } catch (error) {
    console.error('Error actualitzant la incidència:' + error.message);
    res.status(500).send('Error actualitzant la incidència: ' + error.message);
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
