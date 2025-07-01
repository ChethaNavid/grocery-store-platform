import express from 'express';
import {getAllProduct} from '../controllers/productController.js';
import { getAllFruit, getAllVegetables, getAllBakery, getAllBeverages, getAllDiary, getAllFrozen, getAllMeat, getAllSnacks} from '../controllers/categoryController.js';

const categoryRouterAdmin = express.Router();
categoryRouterAdmin.get('/', getAllProduct);
categoryRouterAdmin.get('/Fruit', getAllFruit);
categoryRouterAdmin.get('/Vegetables', getAllVegetables);
categoryRouterAdmin.get('/Bakery', getAllBakery);
categoryRouterAdmin.get('/Beverages', getAllBeverages);
categoryRouterAdmin.get('/Diary', getAllDiary);
categoryRouterAdmin.get('/Frozen', getAllFrozen);
categoryRouterAdmin.get('/Meat', getAllMeat);
categoryRouterAdmin.get('/Snacks', getAllSnacks);

export default categoryRouterAdmin;