import express from 'express';
import { getAllUsers, editUser, deleteUser, createUser, getPrivilegesAndTables } from '../controllers/userController.js'; // Make sure the correct path is used

const databaseAdmin = express.Router();

// Admin routes for user management
databaseAdmin.get('/users', getAllUsers);           // Fetch all users
databaseAdmin.get('/privileges_and_tables', getPrivilegesAndTables);       // Fetch all tables in the database
databaseAdmin.post('/create-user', createUser);    // Create a new user
databaseAdmin.put('/edit-user/:username', editUser);   // Edit an existing user by username
databaseAdmin.delete('/users/:username', deleteUser); // Delete an existing user by username

export default databaseAdmin;
