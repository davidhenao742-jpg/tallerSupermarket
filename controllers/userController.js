const { User } = require('../models');
const { UniqueConstraintError } = require('sequelize');
// GET /api/users
exports.getAll = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
  }
};
// GET /api/users/:id
exports.getById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuario', error: error.message });
  }
};
// POST /api/users
exports.create = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: 'name y email son obligatorios' });
    }
    const user = await User.create({ name, email, role });
    res.status(201).json(user);
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      return res.status(409).json({ message: 'El email ya está registrado' });
    }
    res.status(400).json({ message: 'Error al crear usuario', error: error.message });
  }
};
// PUT /api/users/:id
exports.update = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    const { name, email, role } = req.body;
    await user.update({ name, email, role });
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      return res.status(409).json({ message: 'El email ya está registrado' });
    }
    res.status(400).json({ message: 'Error al actualizar usuario', error: error.message });
  }
};
// DELETE /api/users/:id
exports.remove = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    await user.destroy();
    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar usuario', error: error.message });
  }
};
