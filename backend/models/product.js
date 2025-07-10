import sequelize from "../database/database.js";
import { DataTypes } from "sequelize";

export const Product = sequelize.define("Product", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    inStock: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    imageName: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
})
