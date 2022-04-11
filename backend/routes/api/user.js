import express from 'express';
import { login, register } from '../../controllers/userController.js';
const userRouter = express.Router();

userRouter.post('/login', login).post('/register', register);

export default userRouter;
