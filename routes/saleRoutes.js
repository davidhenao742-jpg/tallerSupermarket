const express = require('express');
const router = express.Router();
const controller = require('../controllers/saleController');
/**
 * @swagger
 * tags:
 *   name: Sales
 *   description: Gestión de ventas (el total se calcula automáticamente)
 */
/**
 * @swagger
 * /api/sales:
 *   get:
 *     summary: Obtener todas las ventas
 *     tags: [Sales]
 *     responses:
 *       200:
 *         description: Lista de ventas
 */
router.get('/', controller.getAll);
/**
 * @swagger
 * /api/sales/{id}:
 *   get:
 *     summary: Obtener una venta por ID
 *     tags: [Sales]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Venta encontrada
 *       404:
 *         description: Venta no encontrada
 */
router.get('/:id', controller.getById);
/**
 * @swagger
 * /api/sales:
 *   post:
 *     summary: Crear una nueva venta (el total se calcula automáticamente a partir de los detalles)
 *     tags: [Sales]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               details:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: integer
 *                     quantity:
 *                       type: integer
 *           example:
 *             userId: 1
 *             details:
 *               - productId: 1
 *                 quantity: 2
 *               - productId: 3
 *                 quantity: 1
 *     responses:
 *       201:
 *         description: Venta creada
 *       400:
 *         description: Datos inválidos o stock insuficiente
 */
router.post('/', controller.create);
/**
 * @swagger
 * /api/sales/{id}:
 *   put:
 *     summary: Actualizar una venta (el total siempre se recalcula desde los detalles)
 *     tags: [Sales]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Venta actualizada
 */
router.put('/:id', controller.update);
/**
 * @swagger
 * /api/sales/{id}:
 *   delete:
 *     summary: Eliminar una venta
 *     tags: [Sales]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Venta eliminada
 */
router.delete('/:id', controller.remove);
module.exports = router;