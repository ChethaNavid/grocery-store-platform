import sequelize from "../database/database.js";
import { DataTypes, DATE } from "sequelize";
import { Product } from "./product.js";

export const Category = sequelize.define("Category", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
}, {
    timestamps: false
})
