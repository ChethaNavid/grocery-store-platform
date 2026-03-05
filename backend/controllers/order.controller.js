import { Order } from "../models/order.js";
import { OrderDetail } from "../models/orderDetail.js";
import { Payment } from "../models/payment.js";
import { Product } from "../models/product.js";
import { v4 as uuidv4 } from "uuid";

// GET /orders
export const getAllOrder = async (req, res) => {
  const limit = 10; // Static limit to prevent excessive queries
  const page = parseInt(req.query.page) || 1;

  try {
    const total = await Order.count();
    const totalPage = Math.ceil(total / limit);

    const orders = await Order.findAll({
      limit: limit,
      offset: (page - 1) * limit,
    });

    return res.status(200).json({
      error: false,
      meta: {
        totalItems: total,
        page: page,
        totalPage: totalPage,
      },
      orders,
      message: "Orders retrieved successfullly",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: true, message: error.message });
  }
};

// POST/create-order
export const createOrder = async (req, res) => {
  const { totalAmount, totalPrice } = req.body;
  const { user_id } = req.user;

  try {
    const order = await Order.create({
      totalAmount,
      totalPrice,
      userId: user_id,
    });

    return res
      .status(201)
      .json({ error: false, order, message: "Order created successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: true, message: error });
  }
};

// POST/create-order-detail
export const createOrderDetail = async (req, res) => {
  const { quantity, pricePerUnit, productId, orderId } = req.body;

  try {
    // Check if product exists and has enough stock
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({
        error: true,
        message: "Product not found",
      });
    }

    if (product.quantity < quantity) {
      return res.status(400).json({
        error: true,
        message: `Insufficient stock. Only ${product.quantity} items available`,
      });
    }

    if (!product.inStock) {
      return res.status(400).json({
        error: true,
        message: "Product is out of stock",
      });
    }

    // Create order detail
    const orderDetail = await OrderDetail.create({
      quantity,
      pricePerUnit,
      productId,
      orderId,
    });

    // Reduce product stock
    const newQuantity = product.quantity - quantity;
    await product.update({
      quantity: newQuantity,
      inStock: newQuantity > 0,
    });

    return res.status(201).json({
      error: false,
      orderDetail,
      message: "Order detail created successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: true, message: error });
  }
};

// POST/create-payment
export const createPayment = async (req, res) => {
  const { method, amount, orderId } = req.body;

  try {
    const transactionRef = uuidv4();

    const createPayment = await Payment.create({
      method,
      amount,
      transactionRef,
      orderId,
    });
    return res.status(201).json({
      error: true,
      createPayment,
      message: "Payment created successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: true, message: error });
  }
};
