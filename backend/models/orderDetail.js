import sequelize from "../database/database.js";
import { DataTypes } from "sequelize";

export const OrderDetail = sequelize.define('OrderDetail', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    },
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
});
