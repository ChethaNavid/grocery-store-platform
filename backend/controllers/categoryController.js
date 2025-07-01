import { Product, OrderDetail, sequelize } from "../models/index.js";

const getAllFruit = async (req, res) => {
    try {
        const fruit = await Product.findAll({
            where: { categoryId: '1' }
        });

        if (!fruit) {
            return res.status(404).json({ error: true, message: "No Fruit Found." });
        }

        return res.status(200).json({ error: false, fruit, message: "Fruit fetched successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
}

const getAllVegetables = async (req, res) => {
    try {
        const vegetables = await Product.findAll({
            where: { categoryId: '2' }
        });

        if (!vegetables) {
            return res.status(404).json({ error: true, message: "No Vegetables Found." });
        }

        return res.status(200).json({ error: false, vegetables, message: "Vegetables fetched successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
}
const getAllDiary = async (req, res) => {
    try {
        const diary = await Product.findAll({
            where: { category: 'Diary' }
        });

        if (!diary) {
            return res.status(404).json({ error: true, message: "No Diary Products Found." });
        }

        return res.status(200).json({ error: false, diary, message: "Diary Products fetched successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
}
const getAllMeat = async (req, res) => {
    try {
        const meat = await Product.findAll({
            where: { category: 'Meat' }
        });

        if (!meat) {
            return res.status(404).json({ error: true, message: "No Meat Products Found." });
        }

        return res.status(200).json({ error: false, meat, message: "Meat Products fetched successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
}
const getAllBakery = async (req, res) => {
    try {
        const bakery = await Product.findAll({
            where: { category: 'Bakery' }
        });

        if (!bakery) {
            return res.status(404).json({ error: true, message: "No Bakery Products Found." });
        }

        return res.status(200).json({ error: false, bakery, message: "Bakery Products fetched successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
}
const getAllBeverages = async (req, res) => {
    try {
        const beverages = await Product.findAll({
            where: { category: 'Beverages' }
        });

        if (!beverages) {
            return res.status(404).json({ error: true, message: "No Beverages Found." });
        }

        return res.status(200).json({ error: false, beverages, message: "Beverages fetched successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
}
const getAllSnacks = async (req, res) => {
    try {
        const snacks = await Product.findAll({
            where: { category: 'Snacks' }
        });

        if (!snacks) {
            return res.status(404).json({ error: true, message: "No Snacks Found." });
        }

        return res.status(200).json({ error: false, snacks, message: "Snacks fetched successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
}
const getAllFrozen = async (req, res) => {
    try {
        const frozen = await Product.findAll({
            where: { category: 'Frozen' }
        });

        if (!frozen) {
            return res.status(404).json({ error: true, message: "No Frozen Products Found." });
        }

        return res.status(200).json({ error: false, frozen, message: "Frozen Products fetched successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
}
export {
    getAllFruit,
    getAllVegetables,
    getAllDiary,
    getAllMeat,
    getAllBakery,
    getAllBeverages,
    getAllSnacks,
    getAllFrozen
};