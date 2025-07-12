import { Category, Product, User, Role } from "../models/index.js";
import dotenv from 'dotenv';
dotenv.config();

/**
 * =========================
 * User & Role Admin Routes
 * =========================
 */

// GET /database_admin/users - Get all users with their roles
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: {
        model: Role,
        attributes: ['id', 'name'],
      },
    });
    return res.status(200).json({ users }); // Must return { users: [...] }
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

// GET /database_admin/roles - Get all roles
const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    return res.status(200).json({ roles });
  } catch (error) {
    console.error("Error fetching roles:", error);
    return res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

// PUT /database_admin/users/:id - Edit user
const editUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, roleId } = req.body;

  if (!name && !email && !roleId) {
    return res.status(400).json({ error: true, message: "No changes provided." });
  }

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: true, message: "User not found." });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.roleId = roleId || user.roleId;

    await user.save();

    const updatedUser = await User.findByPk(id, {
      include: { model: Role, attributes: ['id', 'name'] }
    });

    return res.status(200).json({
      error: false,
      user: updatedUser,
      message: "User updated successfully."
    });
  } catch (error) {
    console.error("Error updating user:", error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: true, message: "Email already exists." });
    }
    return res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

// DELETE /database_admin/users/:id - Delete user
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: true, message: 'User not found.' });
    }

    await User.destroy({ where: { id } });

    return res.status(200).json({
      error: false,
      message: "User deleted successfully."
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

export { getAllUsers, getAllRoles, editUser, deleteUser };
