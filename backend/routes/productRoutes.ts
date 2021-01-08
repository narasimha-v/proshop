import { Router } from 'express';
import asyncHandler from 'express-async-handler';

import { Product } from '../models';

const router = Router();

/**
 * @description Fetch all products
 * @route GET /api/products
 * @access Public
 */
router.get(
	'/',
	asyncHandler(async (req, res) => {
		const products = await Product.find({});
		res.json(products);
	})
);

/**
 * @description Fetch single product
 * @route GET /api/products/:id
 * @access Public
 */
router.get(
	'/:id',
	asyncHandler(async (req, res) => {
		const { id } = req.params as { id: string };
		const product = await Product.findById(id);
		if (product) res.json(product);
		else {
			res.status(404);
			throw new Error('Product not found.');
		}
	})
);

export default router;
