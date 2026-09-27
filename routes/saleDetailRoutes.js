const express = require('express');
const router = express.Router();
const controller = require('../controllers/saleDetailController');
/**
 * @swagger
 * tags:
 *   name: SaleDetails
 *   description: Gestión de detalles de venta
 */
/**
 * @swagger
 * /api/sale-details:
 *   get:
 *     summary: Obtener todos los detalles de venta
 *     tags: [SaleDetails]
 *     responses:
 *       200:
 *         description: Lista de detalles de venta
 */
router.get('/', controller.getAll);
/**
 * @swagger
 * /api/sale-details/{id}:
 *   get:
 *     summary: Obtener un detalle de venta por ID
 *     tags: [SaleDetails]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalle encontrado
 *       404:
 *         description: Detalle no encontrado
 */
router.get('/:id', controller.getById);
/**
 * @swagger
 * /api/sale-details:
 *   post:
 *     summary: Agregar una línea a una venta existente
 *     tags: [SaleDetails]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               saleId:
 *                 type: integer
 *               productId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Detalle creado (el total de la venta se recalcula)
 */
router.post('/', controller.create);
/**
 * @swagger
 * /api/sale-details/{id}:
 *   put:
 *     summary: Actualizar la cantidad de un detalle de venta
 *     tags: [SaleDetails]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalle actualizado (el total de la venta se recalcula)
 */
router.put('/:id', controller.update);
/**
 * @swagger
 * /api/sale-details/{id}:
 *   delete:
 *     summary: Eliminar un detalle de venta
 *     tags: [SaleDetails]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalle eliminado (el total de la venta se recalcula)
 */
router.delete('/:id', controller.remove);
module.exports = router;