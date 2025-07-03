import { Category, Product } from "../models/index.js";

// POST/admin/create-product
const addProduct = async (req, res) => {
    const { name, quantity, description, price, imageName, categoryName } = req.body;

    if(!name) return res.status(400).json({ error: true, message: "Name is required." })

    if(!quantity) return res.status(400).json({ error: true, message: "Quantity is required." })

    if(!description) return res.status(400).json({ error: true, message: "Description is required." })

    if(!price) return res.status(400).json({ error: true, message: "Price is required." })

    if(!imageName) return res.status(400).json({ error: true, message: "Image is required." })

    if(!categoryName) return res.status(400).json({ error: true, message: "Category name is required." })

    try {
        const category = await Category.findOne({
            where: { name: categoryName }
        })

        if(!category) {
            return res.status(404).json({ error: true, message: `Category ${category} not found.` });
        }

        const newProduct = await Product.create({
            name, quantity, description, price, imageName, categoryId: category.id,
            include: { model: Category, attributes: ['name'] }
        });

        const fullProduct = await Product.findByPk(newProduct.id, {
            include: {
                model: Category,
                attributes: ['name'] 
            }
        });

        return res.status(201).json({ 
            error: false, 
            product: fullProduct,
            message: "Product created successfully."
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
}

// PUT/admin/edit-product/:id
const editProduct = async (req, res) => {
    const { id } = req.params;
    const { name, quantity, description, price, imageName, categoryName } = req.body;

    if(!name && !quantity && !description && !price && !imageName && !categoryName) {
        return res.status(400).json({ error: true, message: "No change provided." });
    }

    try {

        const category = await Category.findOne({
            where: { name: categoryName }
        })

        if(!category) {
            return res.status(404).json({ error: true, message: `Category ${category} not found.` });
        }

        await Product.update(
            { name, quantity, description, price, imageName, categoryId: category.id },
            { where: { id } }
        )

        const updatedProduct = await Product.findByPk(id, {
            include: {
                model: Category, attributes: ['name']
            }
        })
        
        return res.status(200).json({ 
            error: false, 
            product: updatedProduct,
            message: "Product updated successfully."
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
}

// DELETE/admin/delete-product/:id
const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProduct = await Product.destroy({
            where: { id }
        });

        return res.status(200).json({ 
            error: false, 
            message: "Product deleted successfully."
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
}

export {addProduct, editProduct, deleteProduct};

