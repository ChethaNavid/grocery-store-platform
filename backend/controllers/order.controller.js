import { Order } from "../models/order.js";
import { OrderDetail } from "../models/orderDetail.js";

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