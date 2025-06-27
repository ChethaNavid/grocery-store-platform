import express from 'express';
import cors from 'cors';
import { sequelize } from '../models/index.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
    origin: "*",
}))

try {
  const result = await sequelize.sync({alter: true});
  console.log(result);
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
})