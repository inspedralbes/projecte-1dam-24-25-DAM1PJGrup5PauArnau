// src/routes/departmentsEJS.routes.js
const express = require('express');
const router = express.Router();
const Department = require('../models/Department'); // Importem el model de Departament

// Llistar departaments
router.get('/', async (req, res) => {
  try {
    const departments = await Department.findAll();
    res.render('departments/list', { departments });
  } catch (error) {
    res.status(500).send('Error al recuperar departaments');
  }
});

// Form per nova categoria (Departament)
router.get('/new', (req, res) => {
  res.render('departments/new');
});

// Crear departament
router.post('/create', async (req, res) => {
  try {
    const { name } = req.body;
    await Department.create({ name });
    res.redirect('/departments');
  } catch (error) {
    res.status(500).send('Error al crear departament');
  }
});

// Form per editar departament
router.get('/:id/edit', async (req, res) => {
  try {
    const department = await Department.findByPk(req.params.id);
    if (!department) return res.status(404).send('Departament no trobat');
    res.render('departments/edit', { department });
  } catch (error) {
    res.status(500).send('Error al carregar formulari d’edició');
  }
});

// Actualitzar departament
router.post('/:id/update', async (req, res) => {
  try {
    const { name } = req.body;
    const department = await Department.findByPk(req.params.id);
    if (!department) return res.status(404).send('Departament no trobat');
    department.name = name;
    await department.save();
    res.redirect('/departments');
  } catch (error) {
    res.status(500).send('Error al actualitzar departament');
  }
});

// Eliminar departament
router.get('/:id/delete', async (req, res) => {
  try {
    const department = await Department.findByPk(req.params.id);
    if (!department) return res.status(404).send('Departament no trobat');
    await department.destroy();
    res.redirect('/departments');
  } catch (error) {
    res.status(500).send('Error al eliminar departament');
  }
});

module.exports = router;