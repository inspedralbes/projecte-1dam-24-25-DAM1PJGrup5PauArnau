const express = require('express');
const router = express.Router();
const Tecnic = require('../models/Tecnic');

// Llistar tècnics
router.get('/', async (req, res) => {
  try {
    // Carrega tots els tècnics amb els atributs necessaris
    const tecnics = await Tecnic.findAll({ attributes: ['id', 'nom', 'especialitat'] });
    res.render('tecnics/list', { tecnics }); // Passa els tècnics a la vista
  } catch (error) {
    console.error('Error carregant els tècnics:' + error.message);
    res.status(500).send('Error carregant els tècnics' + error.message);
  }
});


// Formulari per afegir un tècnic
router.get('/new', (req, res) => {
  res.render('tecnics/new');
});

// Crear un tècnic
router.post('/create', async (req, res) => {
  try {
    const { nom, especialitat } = req.body;
    await Tecnic.create({ nom, especialitat });
    res.redirect('/tecnics');
  } catch (error) {
    console.error('Error creant el tècnic:', error.message);
    res.status(500).send('Error creant el tècnic');
  }
});

router.post('/:id/delete', async (req, res) => {
  try {
    const tecnic_id = await Tecnic.findByPk(req.params.id);
    if (!tecnic_id) return res.status(404).send('Tecnic no trobat');

    // Esborra el departament
    await tecnic_id.destroy();
    res.redirect('/tecnics');
  } catch (error) {
    res.status(500).send('Error al eliminar Tecnic: ' + error.message);
  }
});

module.exports = router;