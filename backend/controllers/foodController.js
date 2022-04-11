import FoodIntake from './../models/foodIntake.js';
const CALORIE_LIMIT = 2100;
export const addFood = async (req, res) => {
	try {
		const { user } = req;
		const { item, calories, entryTime, userId } = req.body;
		const foodItem = {
			item,
			calories,
			entryTime,
			userId
		};
		if (!user.isAdmin) {
			foodItem.userId = user._id;
		}
		await FoodIntake.create(foodItem);
		res.status(200).send({ message: 'Successfully added food intake' });
	} catch (err) {
		console.log(err);
		res.status(500).send({
			status: false,
			message: 'Something went wrong'
		});
	}
};

export const getFoodDetailsForCurrentUser = async (req, res) => {
	try {
		const { user } = req;
		const { start, end } = req.query;
		const result = await FoodIntake.find({ userId: user._id, entryTime: { $gte: new Date(+start), $lt: new Date(+end) } });
		const dayCalorieMapping = {};
		result.forEach((item) => {
			const date = new Date(item.entryTime).toISOString().split('T')[0];
			if (!dayCalorieMapping[date]) {
				dayCalorieMapping[date] = 0;
			}
			dayCalorieMapping[date] += item.calories;
		});
		const summary = [];
		Object.keys(dayCalorieMapping).forEach((date) => {
			if (dayCalorieMapping[date] >= CALORIE_LIMIT) {
				summary.push({ date, calories: dayCalorieMapping[date] });
			}
		});
		res.status(200).send({ data: result, summary });
	} catch (err) {
		console.log(err);
		res.status(500).send({
			status: false,
			message: 'Something went wrong'
		});
	}
};

export const editFoodDetails = async (req, res) => {
	try {
		const { id } = req.params;
		const { user } = req;
		const { item, calories, entryTime } = req.body;
		const foodItem = await FoodIntake.findOne({ _id: id, userId: user._id });
		if (!user.isAdmin) {
			const foodItem = await FoodIntake.findOne({ _id: id, userId: user._id });
			if (!foodItem) {
				return res.status(400).json({ message: 'Food item not found for user' });
			}
		}
		const result = await FoodIntake.findByIdAndUpdate(id, { item, calories, entryTime });
		if (!result) {
			return res.status(404).json({ status: false, message: 'The meal details not found' });
		}
		return res.status(200).json({ status: true, message: 'The meal data was updated' });
	} catch (err) {
		res.status(500).send({
			status: false,
			message: 'Something went wrong'
		});
	}
};

export const deleteFoodDetails = async (req, res) => {
	try {
		const { id } = req.params;
		const { user } = req;
		if (!user.isAdmin) {
			const foodItem = await FoodIntake.findOne({ _id: id, userId: user._id });
			if (!foodItem) {
				return res.status(400).json({ message: 'Food item not found for user' });
			}
		}
		const result = await FoodIntake.findByIdAndDelete(id);
		if (!result) {
			return res.status(404).json({ status: false, message: 'Food details not found' });
		}
		return res.status(200).json({ status: true, message: 'Deleted successfully' });
	} catch (err) {
		res.status(500).send({
			status: false,
			message: 'Something went wrong'
		});
	}
};

export const getFoodDetailsForAllUsers = async (req, res) => {
	const { user } = req;
	const { start, end } = req.query;
	const result = await FoodIntake.find({ entryTime: { $gte: new Date(+start), $lt: new Date(+end) } }).populate('userId');
	const dayCalorieMapping = {};
	result.forEach((item) => {
		const date = new Date(item.entryTime).toISOString().split('T')[0];
		const key = `${item.userId?._id}$${date}`;
		if (!dayCalorieMapping[key]) {
			dayCalorieMapping[key] = { calories: 0, userName: item.userId?.name };
		}
		dayCalorieMapping[key].calories += item.calories;
	});
	const summary = [];
	Object.keys(dayCalorieMapping).forEach((key) => {
		if (dayCalorieMapping[key].calories >= CALORIE_LIMIT) {
			const [userId, date] = key.split('$');
			summary.push({ date, calories: dayCalorieMapping[key].calories, userName: dayCalorieMapping[key].userName });
		}
	});
	res.status(200).send({ data: result, summary });
};
