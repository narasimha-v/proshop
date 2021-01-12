import asyncHandler from 'express-async-handler';

import { User } from '../models';
import { generateToken } from '../utils';
import { Request, Response } from '../types';

/**
 * @description Authenticate user & get token
 * @route POST /api/users/login
 * @access Public
 */
export const authUser = asyncHandler(async (req: Request, res: Response) => {
	const { email, password } = req.body as { email: string; password: string };
	const user = await User.findOne({ email });

	if (user && (await user.macthPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id)
		});
	} else {
		res.status(401);
		throw new Error('Invalid email or password');
	}
});

/**
 * @description Get user profile
 * @route GET /api/users/profile
 * @access Private
 */
export const getUserProfile = asyncHandler(
	async (req: Request, res: Response) => {
		const user = await User.findById(req.user?._id);
		if (user) {
			res.json({
				_id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin
			});
		} else {
			throw new Error('User not found');
		}
	}
);

/**
 * @description Register a new user
 * @route POST /api/users/
 * @access Public
 */
export const registerUser = asyncHandler(
	async (req: Request, res: Response) => {
		const { name, email, password } = req.body as {
			name: string;
			email: string;
			password: string;
		};
		const userExists = await User.findOne({ email });
		if (userExists) {
			res.status(400);
			throw new Error('User already exists');
		}
		const user = await User.create({
			name,
			email,
			password
		});
		if (user) {
			res.status(201).json({
				_id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin
			});
		} else {
			res.status(400);
			throw new Error('Invalid user data');
		}
	}
);
