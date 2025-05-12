const express = require('express');
const router = express.Router();
const Incident = require('../models/Incidencia');
const Tecnic = require('../models/Tecnic');

// Ruta per mostrar les incidències
router.get('/', async (req, res) => {
  try {
    // Carrega totes les incidències amb el tècnic associat
    const incidencies = await Incident.findAll({
      include: [{ model: Tecnic, attributes: ['id', 'nom'] }],
    });

    // Carrega tots els tècnics per al desplegable
    const tecnics = await Tecnic.findAll({ attributes: ['id', 'nom'] });

    // Renderitza la vista amb les incidències i tècnics
    res.render('incidencies/list', { incidencies, tecnics });
  } catch (error) {
    console.error('Error carregant les incidències:', error.message);
    res.status(500).send('Error carregant les incidències');
  }
});

// Ruta per actualitzar una incidència
router.post('/:id/update', async (req, res) => {
  try {
    const { prioritat, tecnicId } = req.body;

    // Actualitza la incidència a la base de dades
    await Incident.update(
      { prioritat, tecnic_id: tecnicId },
      { where: { id: req.params.id } }
    );

    // Redirigeix a la llista d'incidències
    res.redirect('/incidencies');
  } catch (error) {
    console.error('Error actualitzant la incidència:', error.message);
    res.status(500).send('Error actualitzant la incidència');
  }
});

module.exports = router;