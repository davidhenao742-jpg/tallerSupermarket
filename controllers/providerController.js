const { Provider, Product } = require('../models');
// GET /api/providers
exports.getAll = async (req, res) => {
  try {
    const providers = await Provider.findAll({ include: { model: Product, as: 'products' } });
    res.status(200).json(providers);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener proveedores', error: error.message });
  }
};
// GET /api/providers/:id
exports.getById = async (req, res) => {
  try {
    const provider = await Provider.findByPk(req.params.id, { include: { model: Product, as: 'products' } });
    if (!provider) return res.status(404).json({ message: 'Proveedor no encontrado' });
    res.status(200).json(provider);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener proveedor', error: error.message });
  }
};
// POST /api/providers
exports.create = async (req, res) => {
  try {
    const { name, phone, email, city } = req.body;
    if (!name) return res.status(400).json({ message: 'El nombre es obligatorio' });
    const provider = await Provider.create({ name, phone, email, city });
    res.status(201).json(provider);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear proveedor', error: error.message });
  }
};
// PUT /api/providers/:id
exports.update = async (req, res) => {
  try {
    const provider = await Provider.findByPk(req.params.id);
    if (!provider) return res.status(404).json({ message: 'Proveedor no encontrado' });
    const { name, phone, email, city } = req.body;
    await provider.update({ name, phone, email, city });
    res.status(200).json(provider);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar proveedor', error: error.message });
  }
};
// DELETE /api/providers/:id
exports.remove = async (req, res) => {
  try {
    const provider = await Provider.findByPk(req.params.id);
    if (!provider) return res.status(404).json({ message: 'Proveedor no encontrado' });
    await provider.destroy();
    res.status(200).json({ message: 'Proveedor eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar proveedor', error: error.message });
  }
};