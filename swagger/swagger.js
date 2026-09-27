const swaggerJsdoc = require('swagger-jsdoc');
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Supermercado - MarketSoft',
      version: '1.0.0',
      description:
        'API REST para la gestión de productos, proveedores, usuarios y ventas de un supermercado. ' +
        'Actividad Colaborativa I - Taller Integrador (Node.js + Express + PostgreSQL + Sequelize).'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor local'
      }
    ]
  },
  apis: ['./routes/*.js']
};
const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;