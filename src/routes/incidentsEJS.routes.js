// src/routes/incidentsEJS.routes.js
const express = require('express');
const router = express.Router();
const Incident = require('../models/Incident');  // Model d'Incidència
const Department = require('../models/Department');  // Model de Departament

// Llistar incidències
router.get('/', async (req, res) => {
    try {
        const incidents = await Incident.findAll({ include: Department });
        res.render('incidents/list', { incidents });
    } catch (error) {
        res.status(500).send('Error al recuperar incidències');
    }
});

// Form per crear una incidència (GET)
router.get('/new', async (req, res) => {
    try {
        const departments = await Department.findAll();  // Carregar departaments
        res.render('incidents/new', { departments });
    } catch (error) {
        res.status(500).send('Error al carregar el formulari');
    }
});

// Crear incidència (POST)
router.post('/create', async (req, res) => {
    try {
        const { description, priority, departmentId } = req.body;
        await Incident.create({ description, priority, departmentId });
        res.redirect('/incidents'); // Torna al llistat d'incidències
    } catch (error) {
        res.status(500).send('Error al crear la incidència');
    }
});

// Form per editar una incidència (GET)
router.get('/:id/edit', async (req, res) => {
    try {
        const incident = await Incident.findByPk(req.params.id);
        if (!incident) return res.status(404).send('Incidència no trobada');

        const departments = await Department.findAll();
        res.render('incidents/edit', { incident, departments });
    } catch (error) {
        res.status(500).send('Error al carregar el formulari d’edició');
    }
});

// Actualitzar incidència (POST)
router.post('/:id/update', async (req, res) => {
    try {
        const { description, priority, departmentId } = req.body;
        const incident = await Incident.findByPk(req.params.id);
        if (!incident) return res.status(404).send('Incidència no trobada');
        incident.description = description;
        incident.priority = priority;
        incident.departmentId = departmentId;
        await incident.save();
        res.redirect('/incidents');
    } catch (error) {
        res.status(500).send('Error al actualitzar la incidència');
    }
});

// Eliminar incidència (GET)
router.get('/:id/delete', async (req, res) => {
    try {
        const incident = await Incident.findByPk(req.params.id);
        if (!incident) return res.status(404).send('Incidència no trobada');
        await incident.destroy();
        res.redirect('/incidents');
    } catch (error) {
        res.status(500).send('Error al eliminar la incidència');
    }
});

module.exports = router;