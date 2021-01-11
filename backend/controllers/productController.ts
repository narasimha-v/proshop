import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';

import { Product } from '../models';

/**
 * @description Fetch all products
 * @route GET /api/products
 * @access Public
 */
export const getProducts = asyncHandler(async (req: Request, res: Response) => {
	const products = await Product.find({});
	res.json(products);
});

/**
 * @description Fetch single product
 * @route GET /api/products/:id
 * @access Public
 */
export const getProductById = asyncHandler(
	async (req: Request, res: Response) => {
		const { id } = req.params as { id: string };
		const product = await Product.findById(id);
		if (product) res.json(product);
		else {
			res.status(404);
			throw new Error('Product not found.');
		}
	}
);
