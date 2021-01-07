import { Model, Document } from 'mongoose';
import { UserDocument } from '.';

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

interface Review {
	name: string;
	rating: string;
	comment: string;
}

interface ProductForDB extends Product {
	user: UserDocument;
	reviews?: Review[];
}

export interface ProductDocument extends ProductForDB, Document {}

export interface ProductModel extends Model<ProductDocument> {}
