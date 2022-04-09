import express from 'express';
import { isAdminAuthorization, isAuthorised } from '../../config/apiMiddleware.js';
import { getFoodDetailsForCurrentUser, addFood, editFoodDetails, deleteFoodDetails } from '../../controllers/foodController.js';
const foodRouter = express.Router();

foodRouter.get("/get/food", isAuthorised, getFoodDetailsForCurrentUser)
	.post("/add/food", isAuthorised, addFood)
	.put("/edit/food/:id", isAuthorised, isAdminAuthorization, editFoodDetails)
	.delete("/delete/food/:id", isAuthorised, isAdminAuthorization, deleteFoodDetails);

export default foodRouter