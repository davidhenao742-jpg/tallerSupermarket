const { SaleDetail, Sale, Product } = require('../models');
const { recalculateTotal } = require('./saleController');
// GET /api/sale-details
exports.getAll = async (req, res) => {
  try {
    const details = await SaleDetail.findAll({ include: [{ model: Product, as: 'product' }] });
    res.status(200).json(details);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener detalles de venta', error: error.message });
  }
};
// GET /api/sale-details/:id
exports.getById = async (req, res) => {
  try {
    const detail = await SaleDetail.findByPk(req.params.id, { include: [{ model: Product, as: 'product' }] });
    if (!detail) return res.status(404).json({ message: 'Detalle de venta no encontrado' });
    res.status(200).json(detail);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener detalle', error: error.message });
  }
};
// POST /api/sale-details
// Agrega una línea a una venta existente y recalcula el total automáticamente.
exports.create = async (req, res) => {
  try {
    const { saleId, productId, quantity } = req.body;
    if (!saleId || !productId || !quantity) {
      return res.status(400).json({ message: 'saleId, productId y quantity son obligatorios' });
    }
    if (quantity <= 0) {
      return res.status(400).json({ message: 'La cantidad debe ser mayor a 0' });
    }
    const sale = await Sale.findByPk(saleId);
    if (!sale) return res.status(400).json({ message: 'La venta indicada no existe' });
    const product = await Product.findByPk(productId);
    if (!product) return res.status(400).json({ message: 'El producto indicado no existe' });
    if (product.stock < quantity) {
      return res.status(400).json({ message: `Stock insuficiente para el producto ${product.name}` });
    }
    const detail = await SaleDetail.create({ saleId, productId, quantity, price: product.price });
    await product.update({ stock: product.stock - quantity });
    await recalculateTotal(saleId);
    res.status(201).json(detail);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear detalle de venta', error: error.message });
  }
};
// PUT /api/sale-details/:id
exports.update = async (req, res) => {
  try {
    const detail = await SaleDetail.findByPk(req.params.id);
    if (!detail) return res.status(404).json({ message: 'Detalle de venta no encontrado' });
    const { quantity } = req.body;
    if (quantity !== undefined) {
      if (quantity <= 0) return res.status(400).json({ message: 'La cantidad debe ser mayor a 0' });
      await detail.update({ quantity });
    }
    await recalculateTotal(detail.saleId);
    res.status(200).json(detail);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar detalle de venta', error: error.message });
  }
};
// DELETE /api/sale-details/:id
exports.remove = async (req, res) => {
  try {
    const detail = await SaleDetail.findByPk(req.params.id);
    if (!detail) return res.status(404).json({ message: 'Detalle de venta no encontrado' });
    const saleId = detail.saleId;
    await detail.destroy();
    await recalculateTotal(saleId);
    res.status(200).json({ message: 'Detalle de venta eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar detalle de venta', error: error.message });
  }
};
