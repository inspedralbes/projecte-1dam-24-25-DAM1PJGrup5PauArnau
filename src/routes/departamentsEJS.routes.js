// src/routes/departamentsEJS.routes.js
const express = require('express');
const router = express.Router();
const Departament = require('../models/Departament');

// Llistar departaments
router.get('/', async (req, res) => {
  try {
    const departaments = await Departament.findAll();
    res.render('departaments/list', { departaments });
  } catch (error) {
    res.status(500).send('Error al carregar departaments: ' + error.message);
  }
});


// Formulari nou departament
router.get('/new', (req, res) => {
  res.render('departaments/new');
});

// Crear departament
router.post('/create', async (req, res) => {
  try {
    const { nom } = req.body;
    await Departament.create({ nom });
    res.redirect('/departaments');
  } catch (error) {
    res.status(500).send('Error al crear departament: ' + error.message);
  }
});

// Formulari d'edició
router.get('/:id/edit', async (req, res) => {
  try {
    const departament = await Departament.findByPk(req.params.id);
    if (!departament) return res.status(404).send('Departament no trobat');
    res.render('departaments/edit', { departament });
  } catch (error) {
    res.status(500).send('Error al carregar el formulari: ' + error.message);
  }
});

// Actualitzar departament
router.post('/:id/update', async (req, res) => {
  try {
    const { nom } = req.body;
    const departament = await Departament.findByPk(req.params.id);
    if (!departament) return res.status(404).send('Departament no trobat');
    departament.nom = nom;
    await departament.save();
    res.redirect('/departaments');
  } catch (error) {
    res.status(500).send('Error al actualitzar departament: ' + error.message);
  }
});

// Eliminar
// Eliminar departament
router.post('/:id/delete', async (req, res) => {
  try {
    const departament = await Departament.findByPk(req.params.id);
    if (!departament) return res.status(404).send('Departament no trobat');

    // Esborra el departament
    await departament.destroy();
    res.redirect('/departaments');
  } catch (error) {
    res.status(500).send('Error al eliminar departament: ' + error.message);
  }
});

module.exports = router;
