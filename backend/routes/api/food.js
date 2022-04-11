import express from 'express';
import { isAdminAuthorization, isAuthorised } from '../../config/apiMiddleware.js';
import { getFoodDetailsForCurrentUser, addFood, editFoodDetails, deleteFoodDetails, getFoodDetailsForAllUsers, getFoodStats } from '../../controllers/foodController.js';
const foodRouter = express.Router();

foodRouter
	.get('/user', isAuthorised, getFoodDetailsForCurrentUser)
	.get('/allUserItems', isAuthorised, isAdminAuthorization, getFoodDetailsForAllUsers)
	.get('/stats', isAuthorised, isAdminAuthorization, getFoodStats)
	.post('/add', isAuthorised, addFood)
	.put('/edit/:id', isAuthorised, editFoodDetails)
	.delete('/delete/:id', isAuthorised, deleteFoodDetails);

export default foodRouter;
