const { Product, Provider } = require('../models');
// GET /api/products
exports.getAll = async (req, res) => {
  try {
    const products = await Product.findAll({ include: { model: Provider, as: 'provider' } });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos', error: error.message });
  }
};
// GET /api/products/:id
exports.getById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, { include: { model: Provider, as: 'provider' } });
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener producto', error: error.message });
  }
};
// POST /api/products
exports.create = async (req, res) => {
  try {
    const { name, description, price, stock, providerId } = req.body;
    if (!name || price === undefined || providerId === undefined) {
      return res.status(400).json({ message: 'name, price y providerId son obligatorios' });
    }
    if (price <= 0) {
      return res.status(400).json({ message: 'El precio debe ser mayor a 0' });
    }
    if (stock !== undefined && stock < 0) {
      return res.status(400).json({ message: 'El stock no puede ser negativo' });
    }
    const provider = await Provider.findByPk(providerId);
    if (!provider) return res.status(400).json({ message: 'El proveedor indicado no existe' });
    const product = await Product.create({ name, description, price, stock, providerId });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear producto', error: error.message });
  }
};
// PUT /api/products/:id
exports.update = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    const { name, description, price, stock, providerId } = req.body;
    if (price !== undefined && price <= 0) {
      return res.status(400).json({ message: 'El precio debe ser mayor a 0' });
    }
    if (stock !== undefined && stock < 0) {
      return res.status(400).json({ message: 'El stock no puede ser negativo' });
    }
    if (providerId !== undefined) {
      const provider = await Provider.findByPk(providerId);
      if (!provider) return res.status(400).json({ message: 'El proveedor indicado no existe' });
    }
    await product.update({ name, description, price, stock, providerId });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar producto', error: error.message });
  }
};
// DELETE /api/products/:id
exports.remove = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    await product.destroy();
    res.status(200).json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar producto', error: error.message });
  }
};