import sequelize from "../database/database.js";
import { User } from '../models/user.js';
import { Role } from "./role.js";
import { Category } from '../models/category.js';
import { Order } from '../models/order.js';
import { OrderDetail } from '../models/orderDetail.js';
import { Product } from '../models/product.js';
import { Payment } from "./payment.js";

User.belongsTo(Role, {
    foreignKey: {
        name: "roleId",
        allowNull: false
    },
    onDelete: 'RESTRICT'
});

Role.hasMany(User, {
    foreignKey: {
        name: 'roleId',
        allowNull: false
    },
    onDelete: "RESTRICT"
});

// Associations
Category.hasMany(Product, {
    foreignKey: {
        name: "categoryId",
        allowNull: false
    },
    onDelete: 'CASCADE',
});

Product.belongsTo(Category, {
    foreignKey: {
        name: 'categoryId',
        allowNull: false,
    },
    onDelete: 'CASCADE',
});

//Association
Order.belongsTo(User, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
  onDelete: 'CASCADE',
});

User.hasMany(Order, {
    foreignKey: {
        name: "userId",
        allowNull: false
    },
    onDelete: "CASCADE",
});

// Associations
Order.hasMany(OrderDetail, {
  foreignKey: {
    name: 'orderId',
    allowNull: false
  },
  onDelete: 'CASCADE'
});

OrderDetail.belongsTo(Order, {
  foreignKey: {
    name: 'orderId',
    allowNull: false,
  },
  onDelete: 'CASCADE',
});

Product.hasMany(OrderDetail, {
  foreignKey: {
    name: 'productId',
    allowNull: false
  },
  onDelete: 'CASCADE',
});

OrderDetail.belongsTo(Product, {
  foreignKey: {
    name: 'productId',
    allowNull: false,
  },
  onDelete: 'CASCADE',
});

//Association
Order.hasOne(Payment, {
    foreignKey: {
        name: 'orderId',
        allowNull: false
    },
    onDelete: 'CASCADE'
});
Payment.belongsTo(Order, {
    foreignKey: {
        name: 'orderId',
        allowNull: false
    },
    onDelete: 'CASCADE'
})

export {
  sequelize,
  User,
  Role,
  Order,
  Product,
  Category,
  OrderDetail,
  Payment
};