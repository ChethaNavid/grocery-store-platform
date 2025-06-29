import { Product, OrderDetail, sequelize } from "../models/index.js";

// GET/product
const getAllProduct = async (req, res) => {
    try {
        const product = await Product.findAll();

        if(!product) {
            return res.status(404).json({ error: true, message: "No Product Found." });
        }

        return res.status(200).json({ error: false, product, message: "Product fetch successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
}

// GET/popular-product
const getPopularProduct = async (req, res) => {
    try {
        const product = await Product.findAll({
            attributes: [
                'id',
                'name',
                [sequelize.fn('SUM', sequelize.col('OrderDetails.quantity')), 'totalOrdered']
            ],
            include: [{
                model: OrderDetail,
                attributes: []
            }],
            group: ['Product.id'],
            order: [[sequelize.literal('totalOrdered'), 'DESC']],
            subQuery: false
        })
        return res.status(200).json({ error: false, product, message: "Product fetch successfully."})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
}

export {getAllProduct, getPopularProduct};