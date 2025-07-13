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

// PUT /admin/users/:id
const editUser = async (req, res) => {
  const { username, email, roleId } = req.body;
  const userId = req.params.id;

  try {
    const [updated] = await db.User.update(
      { username, email, roleId },
      { where: { id: userId } }
    );

    if (updated) {
      const updatedUser = await db.User.findOne({
        where: { id: userId },
        include: db.Role
      });
      res.json({ message: "User updated successfully", user: updatedUser });
    } else {
      res.status(404).json({ message: "User not found or no changes" });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
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
