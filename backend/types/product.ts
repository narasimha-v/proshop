import { Model, Document } from 'mongoose';

export interface Product {
	name: string;
	image: string;
	description: string;
	brand: string;
	category: string;
	price: number;
	countInStock: number;
	rating: number;
	numReviews: number;
}

export interface Review {
	user: string;
	name: string;
	rating: number;
	comment: string;
}

interface ProductForDB extends Product {
	user: string;
	reviews: Review[];
}

export interface ProductDocument extends ProductForDB, Document {}

export interface ProductModel extends Model<ProductDocument> {}
