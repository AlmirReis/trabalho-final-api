
const express = require('express');
const routes = require('./routes');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');

function createApp() {
  const app = express();
  app.use(express.json());
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
  app.use(routes);
  app.get('/health', (_,res)=>res.json({ok:true}));
  return app;
}

module.exports = { createApp };
