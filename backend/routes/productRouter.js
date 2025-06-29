import express from 'express';
import { getAllProduct, getPopularProduct } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.get('/product', getAllProduct);
productRouter.get('/popular-product', getPopularProduct);

export default productRouter;