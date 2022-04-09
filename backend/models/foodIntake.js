import mongoose from 'mongoose';

const FoodSchema = new mongoose.Schema(
	{
		item: {
			type: String,
			required: true
		},
		calories: {
			type: Number,
			required: true
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true
		}
	},
	{ timestamps: true }
);

const FoodIntake = mongoose.model('FoodIntake', FoodSchema);
export default FoodIntake;
