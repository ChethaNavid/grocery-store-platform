import express from 'express';
import { getFeatureProduct, getPopularProduct, getProductFromCategory, searchProduct } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.get('/product', getFeatureProduct);
productRouter.get('/popular-product', getPopularProduct);
productRouter.get('/category/:categoryName', getProductFromCategory);
productRouter.get('/search-product', searchProduct);

export default productRouter;