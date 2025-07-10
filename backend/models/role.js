import sequelize from "../database/database.js";
import { DataTypes } from "sequelize";

export const Role = sequelize.define("Role", {
    name: {
        type:DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    timestamps: false
});