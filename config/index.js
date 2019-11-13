const privateRoutes = require('./routes/privateRoutes');
const publicRoutes = require('./routes/publicRoutes');
const constants = require('./constants');

const config = {
  privateRoutes,
  publicRoutes,
  port: process.env.PORT || '5000',
  constants
};

module.exports = config;
