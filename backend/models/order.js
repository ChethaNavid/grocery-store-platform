import sequelize from "../database/database.js";
import { DataTypes } from "sequelize";

export const Order = sequelize.define("Order", {
    totalAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {min: 0}
    },
    status: {
        type: DataTypes.ENUM("pending", "dilivered", "canceled"),
        defaultValue: "pending"
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    orderDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false
})
