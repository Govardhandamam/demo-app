import express from 'express';
import apiRouter from './api/index.js';
const router = express.Router();

router.use('/api/v1', apiRouter);

export default router;
