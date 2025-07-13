import express from 'express';
import {getAllUsers, editUser, deleteUser, getAllRoles} from '../controllers/userController.js';

const databaseAdmin = express.Router();

// Admin routes for user management
databaseAdmin.get('/database_admin/users', getAllUsers);
databaseAdmin.put('/database_admin/users/:id', editUser);
databaseAdmin.delete('/database_admin/users/:id', deleteUser);
databaseAdmin.get('/database_admin/roles', getAllRoles);


export default databaseAdmin;
