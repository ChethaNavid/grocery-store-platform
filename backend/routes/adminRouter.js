import express from 'express'
import { addProduct, editProduct, deleteProduct, getAllProduct } from '../controllers/adminController.js'
import multer from 'multer';

const adminRouter = express.Router();

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

adminRouter.get('/products', getAllProduct);
adminRouter.post('/add-product', upload.single('image'), addProduct);
adminRouter.put('/edit-product/:id', upload.single('image'), editProduct);
adminRouter.delete('/delete-product/:id', deleteProduct);

export default adminRouter;