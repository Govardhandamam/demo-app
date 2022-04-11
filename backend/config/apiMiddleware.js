import User from './../models/user.js';
import jwt from 'jsonwebtoken';

export const isAuthorised = async (req, res, next) => {
	if (req.headers.authorization) {
		const { authorization } = req.headers;
		try {
			const token = authorization.split(' ')[1];
			const decodedPayload = jwt.verify(token, process.env.SECRET_KEY);
			const userData = await User.findOne({ $and: [{ _id: decodedPayload.userId }] }, '-password');
			if (!userData) {
				return res.status(401).send({ message: 'Operation cannot be done' });
			}
			req.user = { email: decodedPayload.email, _id: decodedPayload.userId, isAdmin: userData.isAdmin };
			next();
		} catch (err) {
			res.status(401).json({ message: 'Invalid token' });
		}
	} else {
		res.status(401).json({ message: 'Authorization token not present!' });
	}
};

export const isAdminAuthorization = async (req, res, next) => {
	try {
		const { user } = req;
		const isUserAdmin = user.isAdmin;
		if (isUserAdmin) {
			next();
		} else {
			return res.status(401).send({ message: 'Operation cannot be done' });
		}
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};
