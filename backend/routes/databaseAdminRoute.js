import express from 'express';
import { getAllUsers, editUser, deleteUser, getAllRoles } from '../controllers/userController.js';

const databaseAdmin = express.Router();

// Admin routes for user management
databaseAdmin.get('/users', getAllUsers);
databaseAdmin.put('/users/:id', editUser);
databaseAdmin.delete('/users/:id', deleteUser);
databaseAdmin.get('/roles', getAllRoles);


export default databaseAdmin;
