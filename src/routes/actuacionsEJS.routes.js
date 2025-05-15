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
// actuacions.routes.js o similar
router.post('/create', async (req, res) => {
  const { incidentid, tecnic_id, descripcio, data, temps, resolta, visible } = req.body;

  try {
    await Actuacio.create({
      incidentid: incidentid, // <-- Assegura't que el model té aquest nom de camp!
      tecnic_id: tecnic_id,
      descripcio: descripcio,
      data: data,
      temps: temps, // <-- igual que al model
      resolta: resolta === 'on',
      visible: visible === 'on'
    });

    res.redirect('/');
  } catch (error) {
    console.error('Error creant actuació:', error);
    res.status(500).send('Error al crear l\'actuació');
  }
});



module.exports = router;