const express = require('express');
const router = express.Router();

// Ruta per al dashboard
router.get('/dashboard', async (req, res) => {
  try {
    // Obté les dades de les incidències amb el departament associat
    const incidents = await Incident.findAll({ include: [Department] });
    res.render('admin/dashboard', { incidents }); // Passa les dades a la vista
  } catch (error) {
    console.error('Error carregant el dashboard:', error);
    res.status(500).send('Error carregant el dashboard');
  }
});

module.exports = router;