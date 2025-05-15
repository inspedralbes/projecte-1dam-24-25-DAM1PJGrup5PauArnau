const express = require('express');
const router = express.Router();
const Incident = require('../models/Incidencia');
const Departament = require('../models/Departament');
const Tecnic = require('../models/Tecnic');
const Actuacio = require('../models/Actuacio');

// Llistar incidències
router.get('/', async (req, res) => {
  try {

    const incidencies = await Incident.findAll({
      include: [
        { model: Departament, attributes: ['nom'] },
        { model: Tecnic, attributes: ['nom'] },
        { model: Actuacio, include: [{ model: Tecnic, attributes: ['nom'] }]        }
      ],
      order: [['createdAt', 'DESC']]
    });

    const departaments = await Departament.findAll({ attributes: ['nom'] });

    // Renderitza la vista normal
    res.render('incidencies/list', { incidencies, createdId: req.query.createdId, departaments });
  } catch (error) {
    console.error('Error carregant les incidències:', error.message);
    res.status(500).send('Error carregant les incidències');
  }
});

// Formulari nova incidència
router.get('/new', async (req, res) => {
  const departaments = await Departament.findAll();
  res.render('incidencies/new', { departaments });
});

// Crear incidència
router.post('/create', async (req, res) => {
  try {
    const { descripcio, prioritat, departmentId } = req.body;

    const departament = await Departament.findByPk(departmentId);
    if (!departament) {
      return res.status(404).send('Departament no trobat');
    }

    const novaIncidencia = await Incident.create({
      descripcio,
      prioritat,
      departamentId: departmentId,
    });

    // Redirigeix a index amb el nou ID
    res.redirect(`/?createdId=${novaIncidencia.id}`);
  } catch (error) {
    console.error('Error creant la incidència:', error.message);
    res.status(500).send('Error creant la incidència');
  }
});

// Formulari d'edició
router.get('/:id/edit', async (req, res) => {
  try {
    const incidencia = await Incident.findByPk(req.params.id, {
      include: [
        { model: Departament, attributes: ['nom'] },
        { model: Tecnic, attributes: ['id', 'nom'] },
      ],
    });

    const tecnics = await Tecnic.findAll({ attributes: ['id', 'nom'] });

    res.render('incidencies/edit', { incidencia, tecnics });
  } catch (error) {
    console.error('Error carregant la incidència:' + error.message);
    res.status(500).send('Error carregant la incidència'+error.message);
  }
});

// Actualitzar incidència
router.post('/:id/update', async (req, res) => {
  try {
    let { prioritat, tecnicId } = req.body;

    // Si tecnicId és buit, assigna NULL
    tecnicId = tecnicId === '' ? null : tecnicId;

    // Actualitza la incidència a la base de dades
    await Incident.update(
      { prioritat, tecnic_id: tecnicId },
      { where: { id: req.params.id } }
    );

    // Redirigeix a la llista d'incidències
    res.redirect('/incidencies');
  } catch (error) {
    console.error('Error actualitzant la incidència:' + error.message);
    res.status(500).send('Error actualitzant la incidència: ' + error.message);
  }
});

// Eliminar incidència
router.post('/:id/delete', async (req, res) => {
  const incidencies = await Incident.findByPk(req.params.id);
  if (!incidencies) return res.status(404).send('Incidència no trobada');
  await incidencies.destroy();
  res.redirect('/incidencies');
});

// Petita API per obtenir una incidència i les seves actuacions
// Aquesta API retorna una incidència i les seves actuacions associades
// amb el tècnic que ha realitzat l'actuació + departament
// Aquesta API és per a la vista de l'usuari i no per a la vista de l'administrador
router.get('/api/:id', async (req, res) => {
  try {
    const incidencia = await Incident.findByPk(req.params.id, {
      include: [
        { model: Departament, attributes: ['nom'] },
        {
          model: Actuacio,
          required: false,
          where: { visible: true },
          include: [{ model: Tecnic, attributes: ['nom'] }],
          order: [['createdAt', 'DESC']]
        }
      ]
    });

    if (!incidencia) return res.status(404).json({ error: 'Incidència no trobada' });

    // Agafa l'última actuació visible
    const actuacionsVisibles = incidencia.Actuacios || [];
    const ultimaActuacio = actuacionsVisibles[actuacionsVisibles.length - 1];

    res.json({
      id: incidencia.id,
      descripcio: incidencia.descripcio,
      departament: incidencia.Departament?.nom || '—',
      prioritat: incidencia.prioritat,
      resolta: !!ultimaActuacio?.resolta,
      visible: !!ultimaActuacio,
      descripcioTecnic: ultimaActuacio?.descripcio || '',
      dataTecnic: ultimaActuacio?.data || '',
      nomTecnic: ultimaActuacio?.Tecnic?.nom || '',
      // Si vols, pots afegir més camps aquí
    });
  } catch (err) {
    res.status(500).json({ error: 'Error servidor' });
  }
});
module.exports = router;
