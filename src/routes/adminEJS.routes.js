const express = require('express');
const router = express.Router();
const Log = require('../models/Log');

// Ruta per al dashboard
router.get('/', async (req, res) => {
  try {
    res.render('admin/dashboard'); 
  } catch (error) {
    console.error('Error carregant el dashboard:'+error.message);
    res.status(500).send('Error carregant el dashboard');
  }
});

module.exports = router;