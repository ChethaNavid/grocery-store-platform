import { Category, Product } from "../models/index.js";
import { S3Client, GetObjectCommand, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from 'dotenv'
dotenv.config();
 
const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
    },
    region: bucketRegion
})

// GET/admin/product
const getAllProduct = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: {
        model: Category,
        attributes: ['name'],
      },
    });

    if (!products || products.length === 0) {
      return res.status(404).json({ error: true, message: "No Product Found." });
    }

    // Build signed URLs for each product
    const enrichedProducts = await Promise.all(products.map(async (product) => {
      const productData = product.toJSON();

      if (productData.imageName) {
        try {
          const command = new GetObjectCommand({
            Bucket: bucketName,
            Key: productData.imageName, 
          });

          const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

          return {
            ...productData,
            imageUrl: signedUrl, 
          };
        } catch (err) {
          console.error(`Error generating signed URL for ${productData.imageName}`, err);
          return {
            ...productData,
            imageUrl: null, 
          };
        }
      } 
    }));

    return res.status(200).json({
      error: false,
      products: enrichedProducts,
      message: "Products fetched successfully."
    });

  } catch (error) {
    console.error("Internal Server Error:", error);
    return res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

// POST/admin/create-product
const addProduct = async (req, res) => {
    const { name, quantity, description, price, categoryName } = req.body;
    const file = req.file;

    const params = {
      Bucket: bucketName,
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
    }

    if(!name) return res.status(400).json({ error: true, message: "Name is required." })

    if(!quantity) return res.status(400).json({ error: true, message: "Quantity is required." })

    if(!description) return res.status(400).json({ error: true, message: "Description is required." })

    if(!price) return res.status(400).json({ error: true, message: "Price is required." })

    if(!file) return res.status(400).json({ error: true, message: "Image is required." })

    if(!categoryName) return res.status(400).json({ error: true, message: "Category name is required." })

    try {
        const command = new PutObjectCommand(params);
        await s3.send(command);

        const category = await Category.findOne({
            where: { name: categoryName }
        })

        if(!category) {
            return res.status(404).json({ error: true, message: `Category ${category} not found.` });
        }

        const newProduct = await Product.create({
            name, quantity, description, price, imageName: file.originalname, categoryId: category.id,
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
    const { name, quantity, description, price, categoryName } = req.body;
    const file = req.file;

    if(!name && !quantity && !description && !price && !file && !categoryName) {
        return res.status(400).json({ error: true, message: "No change provided." });
    }

    try {
      const existingProduct = await Product.findByPk(id);
      if (!existingProduct) {
        return res.status(404).json({ error: true, message: "Product not found." });
      }

      let newImageName = existingProduct.imageName;
      if(file) {
        const uploadParams = {
          Bucket: bucketName,
          Key: file.originalname,
          Body: file.buffer,
          ContentType: file.mimetype,
        };
        const command = new PutObjectCommand(uploadParams);
        await s3.send(command);

        if(existingProduct.imageName && existingProduct.imageName !== file.originalname) {
          const deleteParams = {
            Bucket: bucketName,
            Key: existingProduct.imageName,
          };
          await s3.send(new DeleteObjectCommand(deleteParams));
        }
        newImageName = file.originalname;
      }

      let categoryId = existingProduct.categoryId;
      if (categoryName) {
        const category = await Category.findOne({ where: { name: categoryName } });
        if (!category) {
          return res.status(404).json({ error: true, message: `Category '${categoryName}' not found.` });
        }
        categoryId = category.id;
      }

      await Product.update(
          {
            name: name || existingProduct.name,
            quantity: quantity || existingProduct.quantity,
            description: description || existingProduct.description,
            price: price || existingProduct.price,
            imageName: newImageName,
            categoryId: categoryId,
          },
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

      const existingProduct = await Product.findByPk(id);
      if (!existingProduct) {
        return res.status(404).json({ error: true, message: 'Product not found.' });
      }

      if(existingProduct.imageName) {
        const deleteParams = {
          Bucket: bucketName,
          Key: existingProduct.imageName,
        };
        await s3.send(new DeleteObjectCommand(deleteParams));
      }

      await Product.destroy({ where: { id } });

      return res.status(200).json({ 
          error: false, 
          message: "Product deleted successfully."
      });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
}

export {getAllProduct, addProduct, editProduct, deleteProduct};

