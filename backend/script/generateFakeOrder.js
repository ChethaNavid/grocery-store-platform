// scripts/generateFakeOrder.js
import { faker } from '@faker-js/faker';
import { Order, Product, sequelize, User } from '../models/index.js';

const generateFakeOrders = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected.');

    // Step 1: Fetch all products with price
    const products = await Product.findAll({ attributes: ['id', 'price'] });

    const users = await User.findAll({ attributes: ['id'] }); 
    const userIds = users.map(user => user.id); 

    const randomUserId = userIds[Math.floor(Math.random() * userIds.length)];

    if (products.length === 0) {
      console.log('❌ No products found. Cannot generate orders.');
      return;
    }

    const fakeOrders = [];

    for (let i = 0; i < 1000; i++) {
      // Step 2: Select a random product
      const selectedProduct = faker.helpers.arrayElement(products);
      const pricePerUnit = parseFloat(selectedProduct.price);

      // Step 3: Generate quantity and calculate total
      const totalAmount = faker.number.int({ min: 1, max: 10 });
      const totalPrice = parseFloat((pricePerUnit * totalAmount).toFixed(2));

      // Step 4: Other order details
      const status = faker.helpers.arrayElement(['pending', 'delivered', 'cancelled']);
      const address = faker.location.city();
      const orderDate = new Date();
      const userId = randomUserId; // adjust based on your actual user IDs

      // Step 5: Push to array
      fakeOrders.push({
        totalAmount,
        totalPrice,
        status,
        address,
        orderDate,
        userId,
      });
    }

    // Step 6: Bulk insert
    await Order.bulkCreate(fakeOrders);
    console.log('✅ Successfully generated 1000 fake orders.');

  } catch (error) {
    console.error('❌ Error generating fake orders:', error);
  } finally {
    await sequelize.close();
    console.log('🔌 Database connection closed.');
  }
};

generateFakeOrders();
