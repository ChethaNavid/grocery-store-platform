import sequelize from "../database/database.js";
import { DataTypes } from "sequelize";
import { Product } from "./product.js";
import { Order } from "./order.js";

export const OrderDetail = sequelize.define('OrderDetail', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    },
  },
  pricePerUnit: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Product, 
      key: 'id'
    }
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Order,
      key: 'id'
    }
  }
}, {
  indexes: [
    {
      name: 'productId_idx',
      fields: ['productId']
    },
    {
      name: 'orderId_idx',
      fields: ['orderId']
    },
    {
      name: 'product_quantity_idx',
      fields: ['productId', 'quantity']
    }
  ]
});
