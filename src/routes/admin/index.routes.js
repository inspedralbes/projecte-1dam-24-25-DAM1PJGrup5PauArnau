const express = require('express');
const router = express.Router();

// Ruta para el panel de administración
router.get('/dashboard', (req, res) => {
  res.send('Benvingut al panell d\'administració');
});

// Otras rutas de administración
router.get('/settings', (req, res) => {
  res.send('Configuració del sistema');
});

module.exports = router;
