import express from 'express';
import { getAllProduct, getPopularProduct, getProductFromCategory } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.get('/product', getAllProduct);
productRouter.get('/popular-product', getPopularProduct);
productRouter.get('/category/:categoryName', getProductFromCategory);

export default productRouter;