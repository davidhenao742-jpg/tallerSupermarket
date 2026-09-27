const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      msg: 'El email ya está registrado'
    },
    validate: {
      isEmail: {
        msg: 'Debe ser un email válido'
      }
    }
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'employee'
  }
}, {
  tableName: 'users',
  timestamps: true
});
module.exports = User;