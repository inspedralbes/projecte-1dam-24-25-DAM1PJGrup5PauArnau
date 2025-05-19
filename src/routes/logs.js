const express = require('express');
const router = express.Router();
const Log = require('../models/Log');

router.get('/logs', async (req, res) => {
  const logs = await Log.find().sort({ timestamp: -1 }).limit(100);
  res.render('admin/logs', { logs });
});

module.exports = router;
