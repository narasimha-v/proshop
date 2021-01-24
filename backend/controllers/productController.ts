import asyncHandler from 'express-async-handler';
import { Request, Response } from '../types';

import { Product } from '../models';

/**
 * @description Fetch all products
 * @route GET /api/products
 * @access Public
 */
export const getProducts = asyncHandler(async (req: Request, res: Response) => {
	const pageSize = 8;
	const page = Number(req.query.pageNumber) || 1;
	const keyword = req.query.keyword
		? {
				name: {
					$regex: req.query.keyword,
					$options: 'i'
				} as any
		  }
		: {};
	const count = await Product.countDocuments({ ...keyword });
	const products = await Product.find({ ...keyword })
		.limit(pageSize)
		.skip(pageSize * (page - 1));
	res.json({ products, page, pages: Math.ceil(count / pageSize) });
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

/**
 * @description Delete a product
 * @route DELETE /api/products/:id
 * @access Private/Admin
 */
export const deleteProduct = asyncHandler(
	async (req: Request, res: Response) => {
		const { id } = req.params as { id: string };
		const product = await Product.findById(id);
		if (product) {
			await product.remove();
			res.json({ message: 'Product Removed' });
		} else {
			res.status(404);
			throw new Error('Product not found.');
		}
	}
);

/**
 * @description Create a product
 * @route POST /api/products/
 * @access Private/Admin
 */
export const createProduct = asyncHandler(
	async (req: Request, res: Response) => {
		const product = new Product({
			name: 'Sample name',
			price: 0,
			user: req.user?._id,
			image: '/images/sample.jpg',
			brand: 'Sample brand',
			category: 'Sample category',
			countInStock: 0,
			numReviews: 0,
			description: 'sample description'
		});
		const createdProduct = await product.save();
		res.status(201).json(createdProduct);
	}
);

/**
 * @description Update a product
 * @route PUT /api/products/:id
 * @access Private/Admin
 */
export const updateProduct = asyncHandler(
	async (req: Request, res: Response) => {
		const { id } = req.params as { id: string };
		const {
			name,
			price,
			image,
			description,
			brand,
			category,
			countInStock
		} = req.body as {
			name: string;
			price: number;
			description: string;
			image: string;
			brand: string;
			category: string;
			countInStock: number;
		};
		const product = await Product.findById(id);
		if (product) {
			product.name = name;
			product.price = price;
			product.description = description;
			product.image = image;
			product.brand = brand;
			product.category = category;
			product.countInStock = countInStock;
			const updatedProduct = await product.save();
			res.status(201).json(updatedProduct);
		} else {
			res.status(404);
			throw new Error('Product not found.');
		}
	}
);

/**
 * @description Create new review
 * @route POST /api/products/:id/reviews
 * @access Private
 */
export const createProductReview = asyncHandler(
	async (req: Request, res: Response) => {
		const { id } = req.params as { id: string };
		const { rating, comment } = req.body as {
			rating: number;
			comment: string;
		};
		const product = await Product.findById(id);
		if (!req.user) {
			res.status(400);
			throw new Error('User not found');
		}
		if (product) {
			const alreadyReviewed = product.reviews.find(
				(r) => r.user.toString() === req.user!._id.toString()
			);
			if (alreadyReviewed) {
				res.status(400);
				throw new Error('Product already reviewed');
			}
			const review = {
				name: req.user.name,
				rating,
				comment,
				user: req.user._id
			};
			product.reviews.push(review);
			product.numReviews = product.reviews.length;
			product.rating =
				product.reviews.reduce((acc, item) => item.rating + acc, 0) /
				product.reviews.length;
			await product.save();
			res.status(201).json({ message: 'Review Added' });
		} else {
			res.status(404);
			throw new Error('Product not found.');
		}
	}
);

/**
 * @description Get top rated products
 * @route GET /api/products/top
 * @access Public
 */
export const getTopProducts = asyncHandler(
	async (req: Request, res: Response) => {
		const products = await Product.find({}).sort({ rating: -1 }).limit(3);
		res.json(products);
	}
);
