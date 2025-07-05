import { Product, OrderDetail, sequelize, Category } from "../models/index.js";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
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

// GET /product
const getFeatureProduct = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: {
        model: Category,
        attributes: ['name'],
      },
      order: sequelize.literal('RAND()'),
      limit: 20,
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

// GET/popular-product
const getPopularProduct = async (req, res) => {
    try {
      const products = await Product.findAll({
        attributes: {
          include: [
            [sequelize.fn('SUM', sequelize.col('OrderDetails.quantity')), 'totalOrdered']
          ]
        },
        include: [{
            model: OrderDetail,
            attributes: []
        }],
        group: ['Product.id'],
        order: [[sequelize.literal('totalOrdered'), 'DESC']],
        limit: 20,
        subQuery: false
      })

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
          }
        }

        return {
          ...productData,
          imageUrl: null,
        };
      }));

      return res.status(200).json({ error: false, products: enrichedProducts, message: "Product fetch successfully."})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
}

// GET/category/:categoryName
const getProductFromCategory = async (req, res) => {

  const { categoryName } = req.params;

  try {
    const category = await Category.findOne({
        where: { name : categoryName }
    });

    if(!category) {
        return res.status(404).json({ error: true, message: "Category Not Found" });
    }
    const products = await Product.findAll({
        where: { categoryId: category.id },
        include: {
            model: Category,
            attributes: ['name'],
        },
    });

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

export {getFeatureProduct, getPopularProduct, getProductFromCategory};