const express = require('express');
const router = express.Router();
const Usuari = require('../models/Usuari');

// Llistar usuaris
router.get('/', async (req, res) => {
  try {
    const usuaris = await Usuari.findAll();
    res.render('usuaris/list', { usuaris });
  } catch (error) {
    res.status(500).send('Error al recuperar usuaris');
  }
});

// Formulari per nou usuari
router.get('/new', (req, res) => {
  res.render('usuaris/new');
});

// Crear usuari
router.post('/create', async (req, res) => {
  try {
    const { nom, cognoms, email, contrasenya, rol } = req.body;
    await Usuari.create({ nom, cognoms, email, contrasenya, rol });
    res.redirect('/usuaris');
  } catch (error) {
    res.status(500).send('Error al crear usuari');
  }
});

// Formulari d'edició
router.get('/:id/edit', async (req, res) => {
  try {
    const usuari = await Usuari.findByPk(req.params.id);
    if (!usuari) return res.status(404).send('Usuari no trobat');
    res.render('usuaris/edit', { usuari });
  } catch (error) {
    res.status(500).send('Error al carregar el formulari');
  }
});

// Actualitzar usuari
router.post('/:id/update', async (req, res) => {
  try {
    const { nom, cognoms, email, contrasenya, rol } = req.body;
    const usuari = await Usuari.findByPk(req.params.id);
    if (!usuari) return res.status(404).send('Usuari no trobat');
    Object.assign(usuari, { nom, cognoms, email, contrasenya, rol });
    await usuari.save();
    res.redirect('/usuaris');
  } catch (error) {
    res.status(500).send('Error al actualitzar usuari');
  }
});

// Eliminar usuari
router.get('/:id/delete', async (req, res) => {
  try {
    const usuari = await Usuari.findByPk(req.params.id);
    if (!usuari) return res.status(404).send('Usuari no trobat');
    await usuari.destroy();
    res.redirect('/usuaris');
  } catch (error) {
    res.status(500).send('Error al eliminar usuari');
  }
});

module.exports = router;