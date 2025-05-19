const Log = require('../models/Log');

const logMiddleware = async (req, res, next) => {
  try {
    await Log.create({
      url: req.originalUrl,
      user: req.session?.user?.nom || 'Anònim', // Si tens auth
      userAgent: req.headers['user-agent']
    });
  } catch (err) {
    console.error('❌ Error enregistrant log:', err);
  }
  next();
};

module.exports = logMiddleware;
