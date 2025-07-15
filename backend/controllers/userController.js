import { sequelize } from "../models/index.js";

// GET all MySQL users
const getAllUsers = async (req, res) => {
  try {
    const [results] = await sequelize.query(`
      SELECT 
        User AS username,
        Host,
        account_locked,
        password_expired
      FROM mysql.user;
    `);

    if (!results.length) {
      return res.status(404).json({ error: true, message: "No MySQL users found." });
    }

    res.status(200).json({ error: false, users: results });
  } catch (err) {
    console.error("Error fetching MySQL users:", err);
    res.status(500).json({ error: true, message: err.message });
  }
};

// CREATE a new MySQL user
const createUser = async (req, res) => {
  const { username, password, host = '%', privileges = [], db = 'groceries_ecommerce.*' } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: true, message: "Username and password are required." });
  }

  try {
    // Check if the user already exists
    const [userExists] = await sequelize.query(
      `SELECT 1 FROM mysql.user WHERE User = ? AND Host = ?`,
      { replacements: [username, host] }
    );

    if (userExists.length > 0) {
      return res.status(400).json({ error: true, message: "User already exists." });
    }

    // 1. Create user
    await sequelize.query(
      `CREATE USER \`${username}\`@\`${host}\` IDENTIFIED BY ?`, 
      { replacements: [password] }
    );

    // 2. Grant privileges if any
    if (Array.isArray(privileges) && privileges.length > 0) {
      const privList = privileges.join(', ');
      await sequelize.query(
        `GRANT ${privList} ON \`${db}\`.* TO \`${username}\`@\`${host}\``
      );
    }

    // 3. Flush privileges
    await sequelize.query(`FLUSH PRIVILEGES`);

    res.status(201).json({ error: false, message: "MySQL user created and privileges assigned." });
  } catch (err) {
    console.error("Error creating MySQL user:", err.message);
    res.status(500).json({
      error: true,
      message: "Failed to create MySQL user.",
      details: err.message
    });
  }
};
  

// UPDATE a MySQL user's password or host
const editUser = async (req, res) => {
  const { username } = req.params;
  const { newPassword, newHost = '%' } = req.body;

  try {
    if (newPassword) {
      await sequelize.query(`ALTER USER ?@'%' IDENTIFIED BY ?`, {
        replacements: [username, newPassword],
      });
    }

    if (newHost !== '%') {
      // Create new host user if changing host
      await sequelize.query(`CREATE USER ?@? IDENTIFIED BY ?`, {
        replacements: [username, newHost, newPassword || 'defaultPassword'],
      });

      // Drop old host user
      await sequelize.query(`DROP USER ?@'%'`, { replacements: [username] });
    }

    await sequelize.query(`FLUSH PRIVILEGES;`);
    res.status(200).json({ error: false, message: "MySQL user updated." });
  } catch (err) {
    console.error("Error updating MySQL user:", err);
    res.status(500).json({ error: true, message: "Failed to update user." });
  }
};

// DELETE a MySQL user
const deleteUser = async (req, res) => {
  const { username } = req.params;

  try {
    // Check if user exists before attempting to delete
    const [userExists] = await sequelize.query(
      `SELECT 1 FROM mysql.user WHERE User = ?`,
      { replacements: [username] }
    );

    if (userExists.length === 0) {
      return res.status(404).json({ error: true, message: "User not found." });
    }

    // Drop user if it exists
    await sequelize.query(`DROP USER IF EXISTS ?@'%'`, {
      replacements: [username],
    });

    await sequelize.query(`FLUSH PRIVILEGES;`);

    res.status(200).json({ message: "MySQL user deleted successfully." });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({
      error: true,
      message: "Failed to delete MySQL user.",
      details: err.message,
    });
  }
};

export { getAllUsers, createUser, editUser, deleteUser };
