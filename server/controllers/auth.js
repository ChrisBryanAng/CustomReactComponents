import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';

import User from '../mongodb/models/user.js';

export const signup = asyncHandler(async (req, res, next) => {
	const { firstName, lastName, email, password } = req.body;

	if (!firstName || !lastName || !email || !password) {
		res.status(400);
		throw new Error('Please add all fields');
	}

	//check if the user already exists
	const existingUser = await User.findOne({ email });
	if (existingUser) {
		res.status(400);
		throw new Error('User with that email already exists');
	}

	const user = await User.create({
		firstName,
		lastName,
		email,
		password: bcrypt.hashSync(password, 10),
	});

	const token = jwt.sign(
		{
			email: user.email,
			firstName: user.firstName,
			lastName: user.lastName,
		},
		process.env.JWT_SECRET,
		{
			expiresIn: '30d',
		}
	);

	if (user) {
		res.status(201).json({
			success: true,
			data: {
				email: user.email,
				firstName: user.firstName,
				lastName: user.lastName,
				token,
			},
		});
	}
});
