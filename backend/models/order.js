import sequelize from "../database/database.js";
import { DataTypes } from "sequelize";

export const Order = sequelize.define("Order", {
    totalAmount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {min: 0}
    },
    totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("pending", "delivered", "cancelled"),
        defaultValue: "pending"
    },
    orderDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false
})
