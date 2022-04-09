import User from './../models/user.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
	try {
		let { email, password } = req.body;
		const user = await User.findOne({ email: email })
		if (user && bcrypt.compareSync(password, user.password)) {
			const token = jwt.sign(
				{ email: user.email, userId: user._id },
				`${process.env.SECRET_KEY}`,
				{
					expiresIn: "1h",
				}
			);
			res.status(200).send({
				user: {
					name: user.name,
					email: user.email,
					isAdmin: user.isAdmin
				}, token
			});
		} else {
			return res.status(404).send("User not found");
		}
	} catch (err) {
		res.status(500).json({
			message: err.message,
		})
	}
}

export const register = async (req, res) => {
	try {
		const { name, email, password } = req.body;
		const emailSanitise = email.toLowerCase()
		const findUser = await User.findOne({ email: emailSanitise });
		if (findUser) {
			res
				.status(400)
				.json({ status: false, message: "User already exists" });
		} else {
			await User.create({
				name,
				email: emailSanitise,
				password: bcrypt.hashSync(password, 10),
			});
			res.status(201).send({ message: "Registration Successfull" });
		}
	} catch (err) {
		res.status(500).json({
			message: err.message,
		})
	}
}