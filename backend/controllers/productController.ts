import asyncHandler from 'express-async-handler';
import { Request, Response } from '../types';

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
