import { Order } from "../models/order.js";
import { OrderDetail } from "../models/orderDetail.js";
import { Payment } from "../models/payment.js";
import { v4 as uuidv4 } from 'uuid';

// POST/create-order
export const createOrder = async (req, res) => {
    const { totalAmount, totalPrice } = req.body;
    const { user_id } = req.user;

    try {
        const order = await Order.create({
            totalAmount, totalPrice, userId: user_id
        })

        return res.status(201).json({ error: false, order, message: "Order created successfully."})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: true, message: error });
    }
}

// POST/create-order-detail
export const createOrderDetail = async (req, res) => {
    const { quantity, pricePerUnit, productId, orderId } = req.body;

    try {
        const orderDetail = await OrderDetail.create({
            quantity, pricePerUnit, productId, orderId
        })
        return res.status(201).json({ error: false, orderDetail, message: "Order detail created successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: true, message: error });
    }
}

// POST/create-payment
export const createPayment = async (req, res) => {
    const { method, amount, orderId } = req.body;

    try {
        const transactionRef = uuidv4();

        const createPayment = await Payment.create({
            method, amount, transactionRef, orderId
        })
        return res.status(201).json({ error: true, createPayment, message: "Payment created successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: true, message: error });
    }
}