import express from 'express';
import { createOrder, createOrderDetail } from '../controllers/order.controller.js';
import authenticateToken from '../middleware/auth.js';

const orderRouter = express.Router();

orderRouter.post("/create-order", authenticateToken, createOrder);
orderRouter.post("/create-order-detail", authenticateToken, createOrderDetail);

export default orderRouter;