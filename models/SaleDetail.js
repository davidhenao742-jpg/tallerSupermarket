const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SaleDetail = sequelize.define('SaleDetail', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  saleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'sale_id'
  },

  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'product_id'
  },

  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: {
        args: [1],
        msg: 'La cantidad debe ser al menos 1'
      }
    }
  },

  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }

}, {
  tableName: 'sale_details',
  timestamps: true
});

module.exports = SaleDetail;