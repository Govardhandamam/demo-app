import express from 'express';
import { login, register, getAllUsers } from '../../controllers/userController.js';
import { isAdminAuthorization, isAuthorised } from '../../config/apiMiddleware.js';
const userRouter = express.Router();

userRouter.post('/login', login).post('/register', register).get('/all', isAuthorised, isAdminAuthorization, getAllUsers);

export default userRouter;
