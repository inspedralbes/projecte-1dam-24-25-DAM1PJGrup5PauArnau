const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  url: String,
  user: { type: String, default: 'Anònim' },
  userAgent: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Log', logSchema);
