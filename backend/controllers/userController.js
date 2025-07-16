import { sequelize } from "../models/index.js";

// GET all MySQL users with role (if you have a role table, join it here)
const getAllUsers = async (req, res) => {
  try {
    const [results] = await sequelize.query(`
      SELECT 
        u.User AS username,
        u.Host,
        GROUP_CONCAT(DISTINCT tp.Table_name) AS tables,
        GROUP_CONCAT(DISTINCT tp.Table_priv) AS table_privileges,
        GROUP_CONCAT(DISTINCT CONCAT_WS(':', db.Db, 
          CONCAT_WS(',', 
            IF(db.Select_priv = 'Y', 'SELECT', NULL),
            IF(db.Insert_priv = 'Y', 'INSERT', NULL),
            IF(db.Update_priv = 'Y', 'UPDATE', NULL),
            IF(db.Delete_priv = 'Y', 'DELETE', NULL),
            IF(db.Create_priv = 'Y', 'CREATE', NULL),
            IF(db.Drop_priv = 'Y', 'DROP', NULL)
          )
        )) AS database_privileges
      FROM mysql.user u
      LEFT JOIN mysql.tables_priv tp ON tp.User = u.User AND tp.Host = u.Host AND tp.Db = 'groceries_ecommerce'
      LEFT JOIN mysql.db db ON db.User = u.User AND db.Host = u.Host AND db.Db = 'groceries_ecommerce'
      WHERE tp.Db = 'groceries_ecommerce' OR db.Db = 'groceries_ecommerce'
      GROUP BY u.User, u.Host;
    `);

    if (!results.length) {
      return res.status(404).json({ error: true, message: "No MySQL users found for the groceries_ecommerce database." });
    }

    res.status(200).json({ error: false, users: results });
  } catch (err) {
    console.error("Error fetching MySQL users:", err);
    res.status(500).json({ error: true, message: err.message });
  }
};

// CREATE a new MySQL user
const createUser = async (req, res) => {
  const {
    username,
    password,
    host = '%',
    privileges = [],
    db = 'groceries_ecommerce',
    tables = [],
  } = req.body;

  if (!username) {
    return res.status(400).json({ error: true, message: "Username is required." });
  }

  try {
    // 1. Check if user exists in MySQL
    const [userExists] = await sequelize.query(
      `SELECT 1 FROM mysql.user WHERE User = ? AND Host = '%'`,
      { replacements: [username] }
    );

    if (userExists.length > 0) {
      return res.status(400).json({ error: true, message: "MySQL user already exists." });
    }

    // 2. Create MySQL user
    await sequelize.query(
      `CREATE USER ?@'%' IDENTIFIED BY ?`,
      { replacements: [username, password] }
    );

    // 3. Grant privileges for specified tables
    if (
      Array.isArray(privileges) &&
      privileges.length > 0 &&
      Array.isArray(tables) &&
      tables.length > 0
    ) {
      const privList = privileges.join(', ');
      for (const table of tables) {
        await sequelize.query(
          `GRANT ${privList} ON ${db}.${table} TO ?@'%'`,
          { replacements: [username] }
        );
      }
    }

    // 4. Flush privileges
    await sequelize.query(`FLUSH PRIVILEGES`);

    res.status(201).json({ error: false, message: "User created successfully in MySQL and app database." });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({
      error: true,
      message: "Failed to create MySQL and app user.",
      details: err.message,
    });
  }
};

// PUT /database_admin/edit-user/:username - Edit an existing MySQL user
// Updates password, privileges, and tables
const editUser = async (req, res) => {
  const { username } = req.params;
  const { newPassword, privileges = [], db = 'groceries_ecommerce', tables = [] } = req.body;

  try {
    // 1. Update password if provided
    if (newPassword && newPassword.trim()) {
      await sequelize.query(
        `ALTER USER \`${username}\`@'%' IDENTIFIED BY ?`,
        { replacements: [newPassword.trim()] }
      );
      console.log(`Password updated for ${username}@%`);
    }

    // 2. Revoke all privileges
    await sequelize.query(
      `REVOKE ALL PRIVILEGES, GRANT OPTION FROM \`${username}\`@'%'`
    );
    console.log(`Privileges revoked from ${username}@%`);

    // 3. Grant privileges
    if (
      Array.isArray(privileges) && privileges.length > 0 &&
      Array.isArray(tables) && tables.length > 0
    ) {
      const privList = privileges.join(', ');
      for (const table of tables) {
        if (typeof table === 'string' && table.trim()) {
          const safeTable = table.trim().replace(/`/g, '');
          await sequelize.query(
            `GRANT ${privList} ON \`${db}\`.\`${safeTable}\` TO \`${username}\`@'%'`
          );
        } else {
          console.warn("Skipped invalid table:", table);
        }
      }
    }

    await sequelize.query(`FLUSH PRIVILEGES`);
    return res.status(200).json({ error: false, message: "User updated successfully." });

  } catch (err) {
    console.error("Error updating user:", err);
    return res.status(500).json({
      error: true,
      message: "Failed to update user.",
      details: err.message,
    });
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
    await sequelize.query(
      `DROP USER IF EXISTS ?@'%'`,
      { replacements: [username] }
    );

    await sequelize.query(`FLUSH PRIVILEGES`);

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

// GET /database_admin/privileges_and_tables - Fetch all tables in the database
const getPrivilegesAndTables = async (req, res) => {
  try {
    const [results] = await sequelize.query(
      `SELECT TABLE_NAME 
       FROM INFORMATION_SCHEMA.TABLES 
       WHERE TABLE_SCHEMA = ?`,
      { replacements: [sequelize.config.database] }
    );

    const tables = results.map(row => row.TABLE_NAME);

    res.json({
      availableTables: tables,
      availablePrivileges: ["SELECT", "INSERT", "UPDATE", "DELETE", "CREATE", "DROP"]
    });
  } catch (err) {
    console.error('Error in getPrivilegesAndTables:', err);
    res.status(500).json({ message: 'Failed to fetch privileges/tables', error: err.message });
  }
};

export { getAllUsers, createUser, editUser, deleteUser, getPrivilegesAndTables };