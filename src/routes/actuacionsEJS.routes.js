const express = require('express');
const router = express.Router();
const Incident = require('../models/Incidencia');
const Tecnic = require('../models/Tecnic');
const Actuacio = require('../models/Actuacio');

// Ruta per mostrar les incidències

// GET: Vista principal amb incidències i tècnics
router.get('/', async (req, res) => {
  try {
    // Carrega tots els tècnics
    const tecnics = await Tecnic.findAll({ attributes: ['id', 'nom'] });

    // Carrega totes les incidències amb el tècnic associat
    const incidencies = await Incident.findAll({
      include: [
        { model: Tecnic, attributes: ['id', 'nom'] },
      ],
    });

    res.render('actuacions/list', { tecnics, incidencies });
  } catch (error) {
    console.error('Error carregant les actuacions:', error.message);
    res.status(500).send('Error carregant les actuacions');
  }
});

// Ruta per actualitzar una actuació
router.post('/create', async (req, res) => {
  try {
    const { descripcio, data, temps, resolta, visible, tecnic_id, incidentid } = req.body;
    await Actuacio.create({
      descripcio,
      data,
      temps,
      resolta: resolta === 'on',
      visible: visible === 'on',
      tecnic_id,
      incidentid
    });
    res.redirect('/');
  } catch (err) {
    console.error('Error creant actuació:', err.message);
    res.status(500).send("Error creant actuació: " + err.message);
  }
});


module.exports = router;