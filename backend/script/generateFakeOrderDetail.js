import { faker } from '@faker-js/faker';
import { OrderDetail, Product, Order, sequelize } from '../models/index.js';

const BATCH_SIZE = 1000;
const TOTAL_RECORDS = 100_000; // 100 thousand records

const generateFakeOrderDetails = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to database');

    const products = await Product.findAll({ attributes: ['id', 'price'] });
    const orders = await Order.findAll({ attributes: ['id'] });

    if (products.length === 0 || orders.length === 0) {
      console.log('❌ No products or orders found. Aborting.');
      return;
    }

    const totalBatches = TOTAL_RECORDS / BATCH_SIZE;

    for (let batch = 0; batch < totalBatches; batch++) {
      const orderDetails = [];

      for (let i = 0; i < BATCH_SIZE; i++) {
        const product = faker.helpers.arrayElement(products);
        const order = faker.helpers.arrayElement(orders);

        const quantity = faker.number.int({ min: 1, max: 10 });
        const pricePerUnit = parseFloat(product.price);

        orderDetails.push({
          quantity,
          pricePerUnit,
          orderId: order.id,
          productId: product.id,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }

      await OrderDetail.bulkCreate(orderDetails);
      console.log(`✅ Inserted batch ${batch + 1}/${totalBatches}`);
    }

    console.log('🎉 Done generating 1 million OrderDetail records');
  } catch (error) {
    console.error('❌ Error generating order details:', error);
  } finally {
    await sequelize.close();
  }
};

generateFakeOrderDetails();
