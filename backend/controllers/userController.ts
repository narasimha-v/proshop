import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';

import { User } from '../models';
import { generateToken } from '../utils';

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
