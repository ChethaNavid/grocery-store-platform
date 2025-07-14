import sequelize from "../database/database.js";
import { DataTypes } from "sequelize";

export const Payment = sequelize.define("Payment", {
  method: {
    type: DataTypes.ENUM("card", "paypal", "offline"),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM("pending", "completed", "failed"),
    defaultValue: "pending"
  },
  transactionRef: {
    type: DataTypes.STRING,
    allowNull: true 
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: { min: 0 }
  },
  paymentDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: false
});
