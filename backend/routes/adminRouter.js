import express from 'express'
import { addProduct, editProduct, deleteProduct } from '../controllers/adminController.js'

const adminRouter = express.Router();

adminRouter.post('/create-product', addProduct);
adminRouter.put('/edit-product/:id', editProduct);
adminRouter.delete('/delete-product/:id', deleteProduct);

export default adminRouter;