const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swagger');
const routes = require('./routes');
const app = express();
app.use(cors());
app.use(express.json());
// Documentación interactiva (View de la API en formato JSON explorable)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'API Supermercado - MarketSoft',
    docs: '/api-docs'
  });
});
app.use('/api', routes);
// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});
module.exports = app;