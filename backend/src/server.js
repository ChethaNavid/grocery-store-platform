import express from 'express';
import cors from 'cors';
import { sequelize } from '../models/index.js';
import dotenv from 'dotenv';
import productRouter from '../routes/productRouter.js';
import adminRouter from '../routes/adminRouter.js';
import { authorizeRole } from '../middleware/authorizeRole.js';
import userRouter from '../routes/user.route.js';
import authenticateToken from '../middleware/auth.js';
dotenv.config();


const app = express();
app.use(express.json());

app.use(cors({
    origin: "*",
}))

try {
  const result = await sequelize.sync()
  console.log(result);
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

app.use('/', productRouter);
app.use('/admin', authenticateToken, authorizeRole('admin'), adminRouter);
app.use('/', userRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
})
