const sequelize = require('../config/database');
const Provider = require('./Provider');
const Product = require('./Product');
const User = require('./User');
const Sale = require('./Sale');
const SaleDetail = require('./SaleDetail');
// Proveedor -> Productos (1:N)
Provider.hasMany(Product, { foreignKey: 'providerId', as: 'products' });
Product.belongsTo(Provider, { foreignKey: 'providerId', as: 'provider' });
// Usuario -> Ventas (1:N)
User.hasMany(Sale, { foreignKey: 'userId', as: 'sales' });
Sale.belongsTo(User, { foreignKey: 'userId', as: 'user' });
// Venta -> DetalleVenta (1:N)
Sale.hasMany(SaleDetail, { foreignKey: 'saleId', as: 'details' });
SaleDetail.belongsTo(Sale, { foreignKey: 'saleId', as: 'sale' });
// Producto -> DetalleVenta (1:N)
Product.hasMany(SaleDetail, { foreignKey: 'productId', as: 'saleDetails' });
SaleDetail.belongsTo(Product, { foreignKey: 'productId', as: 'product' });
module.exports = {
  sequelize,
  Provider,
  Product,
  User,
  Sale,
  SaleDetail
};
