const { Sale, SaleDetail, Product, User, sequelize } = require('../models');
// Recalcula y guarda el total de una venta a partir de sus detalles
async function recalculateTotal(saleId, transaction) {
  const details = await SaleDetail.findAll({ where: { saleId }, transaction });
  const total = details.reduce((sum, d) => sum + Number(d.price) * d.quantity, 0);
  await Sale.update({ total }, { where: { id: saleId }, transaction });
  return total;
}
// GET /api/sales
exports.getAll = async (req, res) => {
  try {
    const sales = await Sale.findAll({
      include: [
        { model: User, as: 'user' },
        { model: SaleDetail, as: 'details', include: { model: Product, as: 'product' } }
      ]
    });
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener ventas', error: error.message });
  }
};
// GET /api/sales/:id
exports.getById = async (req, res) => {
  try {
    const sale = await Sale.findByPk(req.params.id, {
      include: [
        { model: User, as: 'user' },
        { model: SaleDetail, as: 'details', include: { model: Product, as: 'product' } }
      ]
    });
    if (!sale) return res.status(404).json({ message: 'Venta no encontrada' });
    res.status(200).json(sale);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener venta', error: error.message });
  }
};
// POST /api/sales
// Body esperado: { userId, details: [{ productId, quantity }, ...] }
// El total se calcula automáticamente a partir del precio actual de cada producto.
exports.create = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { userId, details } = req.body;
    if (!userId || !Array.isArray(details) || details.length === 0) {
      await t.rollback();
      return res.status(400).json({ message: 'userId y details (no vacío) son obligatorios' });
    }
    const user = await User.findByPk(userId, { transaction: t });
    if (!user) {
      await t.rollback();
      return res.status(400).json({ message: 'El usuario indicado no existe' });
    }
    const sale = await Sale.create({ userId, date: new Date(), total: 0 }, { transaction: t });
    for (const item of details) {
      const product = await Product.findByPk(item.productId, { transaction: t });
      if (!product) {
        await t.rollback();
        return res.status(400).json({ message: `El producto ${item.productId} no existe` });
      }
      if (!item.quantity || item.quantity <= 0) {
        await t.rollback();
        return res.status(400).json({ message: 'La cantidad debe ser mayor a 0' });
      }
      if (product.stock < item.quantity) {
        await t.rollback();
        return res.status(400).json({ message: `Stock insuficiente para el producto ${product.name}` });
      }
      await SaleDetail.create({
        saleId: sale.id,
        productId: product.id,
        quantity: item.quantity,
        price: product.price
      }, { transaction: t });
      await product.update({ stock: product.stock - item.quantity }, { transaction: t });
    }
    const total = await recalculateTotal(sale.id, t);
    await t.commit();
    const created = await Sale.findByPk(sale.id, {
      include: [{ model: SaleDetail, as: 'details', include: { model: Product, as: 'product' } }]
    });
    res.status(201).json(created);
  } catch (error) {
    await t.rollback();
    res.status(400).json({ message: 'Error al crear venta', error: error.message });
  }
};
// PUT /api/sales/:id
// Permite actualizar el usuario asociado a la venta. El total no se edita manualmente:
// se recalcula siempre a partir de los detalles.
exports.update = async (req, res) => {
  try {
    const sale = await Sale.findByPk(req.params.id);
    if (!sale) return res.status(404).json({ message: 'Venta no encontrada' });
    const { userId } = req.body;
    if (userId) {
      const user = await User.findByPk(userId);
      if (!user) return res.status(400).json({ message: 'El usuario indicado no existe' });
      await sale.update({ userId });
    }
    const total = await recalculateTotal(sale.id);
    res.status(200).json({ ...sale.toJSON(), total });
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar venta', error: error.message });
  }
};
// DELETE /api/sales/:id
exports.remove = async (req, res) => {
  try {
    const sale = await Sale.findByPk(req.params.id);
    if (!sale) return res.status(404).json({ message: 'Venta no encontrada' });
    await SaleDetail.destroy({ where: { saleId: sale.id } });
    await sale.destroy();
    res.status(200).json({ message: 'Venta eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar venta', error: error.message });
  }
};
exports.recalculateTotal = recalculateTotal;
