import express from 'express';
import { getFeatureProduct, getPopularProduct, getProductFromCategory } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.get('/product', getFeatureProduct);
productRouter.get('/popular-product', getPopularProduct);
productRouter.get('/category/:categoryName', getProductFromCategory);

export default productRouter;