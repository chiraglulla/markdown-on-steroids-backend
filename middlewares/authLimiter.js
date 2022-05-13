const limitReq = require('express-rate-limit');

const authLimiter = limitReq({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests, try after 1 hour. You seem to be fraudulant',
});

module.exports = { authLimiter };
