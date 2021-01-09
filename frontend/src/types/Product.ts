export interface Product {
	_id: string;
	name: string;
	image: string;
	description: string;
	brand: string;
	category: string;
	price: number;
	countInStock: number;
	rating: number;
	numReviews: number;
	reviews: Array<Review>;
}

export interface Review {
	name: string;
	rating: string;
	comment: string;
}
