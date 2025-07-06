import { createNewAccount, login, getUser } from "../controllers/user.controller.js";
import express from 'express';
import authenticateToken from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post('/create-account', createNewAccount);
userRouter.post('/login', login);
userRouter.get('/get-user', authenticateToken, getUser);

export default userRouter;