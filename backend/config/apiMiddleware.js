import User from './../models/user.js';
import jwt from "jsonwebtoken";

export const isAuthorised = async (req, res, next) => {
	if (req.headers.authorization) {
		const { authorization: token } = req.headers;
		try {
			const decodedPayload = jwt.verify(token, process.env.SECRET_KEY);
			req.user = { email: decodedPayload.email, _id: decodedPayload._id };
			next();
		} catch (err) {
			res.status(401).json({ message: "Invalid token" });
		}
	} else {
		res.status(401).json({ message: "Authorization token not present!" });
	}
}

export const isAdminAuthorization = async (req, res, next) => {
	try {
		const { user } = req;
		const isUserAdmin = await User.findOne({ $and: [{ _id: user }, { isAdmin: true }] }, "-password")
		if (isUserAdmin) {
			req.user = { id: isUserAdmin._id, email: isUserAdmin.email }
			next()
		} else {
			return res.status(401).send({ message: "Operation cannot be done" });
		}
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
}