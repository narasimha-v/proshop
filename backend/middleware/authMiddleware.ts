import jwt from 'jsonwebtoken';
import { User } from '../models';
import { Request, Response, NextFunction } from '../types';
import asyncHandler from 'express-async-handler';

interface Decoded {
	id: string;
	iat: Date;
	exp: Date;
}

export const protect = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		let token;
		const auth = req.headers.authorization;
		if (auth && auth.startsWith('Bearer')) {
			try {
				token = auth.split(' ')[1];
				const decoded = jwt.verify(token, process.env.JWT_SECRET!) as Decoded;
				const user = await User.findById(decoded.id).select('-password');
				if (!user) throw new Error('User Not found');
				req.user = {
					_id: user._id,
					name: user.name,
					email: user.email,
					isAdmin: user.isAdmin
				};
				next();
			} catch (error) {
				console.error(error);
				res.status(401);
				throw new Error('Not authorized, token failed');
			}
		}
		if (!token) {
			res.status(401);
			throw new Error('Not authorized, no token');
		}
	}
);
