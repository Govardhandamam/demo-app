import express from 'express';
import userRouter from './user.js';
import foodRouter from './food.js';
const apiRouter = express.Router();

apiRouter.use("/user", userRouter);

apiRouter.use("/food", foodRouter);

export default apiRouter