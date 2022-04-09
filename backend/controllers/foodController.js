import FoodIntake from './../models/foodIntake.js';

export const addFood = async (req, res) => {
	try {
		const { user } = req;
		const { item, calories, entryTime } = req.body;
		await FoodIntake.create({
			item, calories, entryTime, userId: user.id
		});
		res.status(200).send({ message: "Successfully added food intake" });
	} catch (err) {
		res.status(500).send({
			status: false,
			message: "Something went wrong",
		});
	}
}

export const getFoodDetailsForCurrentUser = async (req, res) => {
	try {
		const { user } = req;
		const result = await FoodIntake.find({ userId: user._id });
		res.status(200).send({ data: result })
	} catch (err) {
		res.status(500).send({
			status: false,
			message: "Something went wrong",
		});
	}
}

export const editFoodDetails = async (req, res) => {
	try {
		const { id } = req.params;
		const { user } = req;
		const { item, calories, entryTime } = req.body;
		const foodItem = await FoodIntake.findOne({ _id: id, userId: user._id });
		if (!foodItem) {
			return res.status(400).json({ message: 'Food item not found for user' });
		}
		const result = await FoodIntake.findByIdAndUpdate(
			id,
			{ item, calories, entryTime },
		)
		if (!result) {
			return res
				.status(404)
				.json({ status: false, message: "The meal details not found" });
		}
		return res
			.status(200)
			.json({ status: true, message: "The meal data was updated" });
	} catch (err) {
		res.status(500).send({
			status: false,
			message: "Something went wrong",
		});
	}
}

export const deleteFoodDetails = async (req, res) => {
	try {
		const { id } = req.params;
		const { user } = req;
		const foodItem = await FoodIntake.findOne({ _id: id, userId: user._id });
		if (!foodItem) {
			return res.status(400).json({ message: 'Food item not found for user' });
		}
		const result = await FoodIntake.findByIdAndDelete(id);
		if (!result) {
			return res
				.status(404)
				.json({ status: false, message: "Food details not found" });
		}
		return res
			.status(200)
			.json({ status: true, message: "Deleted successfully" });
	} catch (err) {
		res.status(500).send({
			status: false,
			message: "Something went wrong",
		});
	}
}