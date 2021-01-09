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
}

export interface ProductState {
	products: Product[];
	loading: boolean;
	error?: undefined;
}

export enum ProductActionTypes {
	PRODUCT_LIST_REQUEST = 'PRODUCT_LIST_REQUEST',
	PRODUCT_LIST_SUCCESS = 'PRODUCT_LIST_SUCCESS',
	PRODUCT_LIST_FAILURE = 'PRODUCT_LIST_FAILURE'
}

export interface FetchProductsRequestAction {
	type: ProductActionTypes.PRODUCT_LIST_REQUEST;
}

export interface FetchProductsSuccessAction {
	type: ProductActionTypes.PRODUCT_LIST_SUCCESS;
	payload: Product[];
}

export interface FetchProductsFailureAction {
	type: ProductActionTypes.PRODUCT_LIST_FAILURE;
	payload: any;
}

export type ProductAction =
	| FetchProductsSuccessAction
	| FetchProductsFailureAction
	| FetchProductsRequestAction;
