import axios from 'axios';
import { errorHandler } from '.';
import { AppThunk } from '../store';
import {
	ProductListActionTypes,
	ProductDetailsActionTypes,
	Product,
	ProductDeleteActionTypes,
	ProductCreateActionTypes,
	ProductUpdateActionTypes,
	ProductCreateReviewActionTypes,
	ProductTopActionTypes
} from '../types';

interface UpdateProductInput {
	_id: string;
	name: string;
	image: string;
	description: string;
	brand: string;
	category: string;
	price: number;
	countInStock: number;
}

export const listProducts = (
	keyword: string = '',
	pageNumber: string = ''
): AppThunk => async (dispatch) => {
	try {
		dispatch({ type: ProductListActionTypes.PRODUCT_LIST_REQUEST });
		const { data } = await axios.get<{
			products: Product[];
			page: number;
			pages: number;
		}>(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`);
		dispatch({
			type: ProductListActionTypes.PRODUCT_LIST_SUCCESS,
			payload: data
		});
	} catch (error) {
		dispatch({
			type: ProductListActionTypes.PRODUCT_LIST_FAILURE,
			payload: errorHandler(error)
		});
	}
};

export const listProductDetails = (id: string): AppThunk => async (
	dispatch
) => {
	try {
		dispatch({ type: ProductDetailsActionTypes.PRODUCT_DETAILS_REQUEST });
		const { data } = await axios.get<Product>(`/api/products/${id}`);
		dispatch({
			type: ProductDetailsActionTypes.PRODUCT_DETAILS_SUCCESS,
			payload: data
		});
	} catch (error) {
		dispatch({
			type: ProductDetailsActionTypes.PRODUCT_DETAILS_FAILURE,
			payload: errorHandler(error)
		});
	}
};

export const deleteProduct = (id: string): AppThunk => async (
	dispatch,
	getState
) => {
	try {
		dispatch({ type: ProductDeleteActionTypes.PRODUCT_DELETE_REQUEST });
		const { userInfo } = getState().userLogin;
		const config = {
			headers: {
				'Content-Type': 'Application/json',
				Authorization: `Bearer ${userInfo?.token}`
			}
		};
		await axios.delete(`/api/products/${id}`, config);
		dispatch({
			type: ProductDeleteActionTypes.PRODUCT_DELETE_SUCCESS
		});
	} catch (error) {
		dispatch({
			type: ProductDeleteActionTypes.PRODUCT_DELETE_FAILURE,
			payload: errorHandler(error)
		});
	}
};

export const createProduct = (): AppThunk => async (dispatch, getState) => {
	try {
		dispatch({ type: ProductCreateActionTypes.PRODUCT_CREATE_REQUEST });
		const { userInfo } = getState().userLogin;
		const config = {
			headers: {
				'Content-Type': 'Application/json',
				Authorization: `Bearer ${userInfo?.token}`
			}
		};
		const { data } = await axios.post<Product>(`/api/products/`, {}, config);
		dispatch({
			type: ProductCreateActionTypes.PRODUCT_CREATE_SUCCESS,
			payload: data
		});
	} catch (error) {
		dispatch({
			type: ProductCreateActionTypes.PRODUCT_CREATE_FAILURE,
			payload: errorHandler(error)
		});
	}
};

export const updateProduct = (product: UpdateProductInput): AppThunk => async (
	dispatch,
	getState
) => {
	try {
		dispatch({ type: ProductUpdateActionTypes.PRODUCT_UPDATE_REQUEST });
		const { userInfo } = getState().userLogin;
		const config = {
			headers: {
				'Content-Type': 'Application/json',
				Authorization: `Bearer ${userInfo?.token}`
			}
		};
		const { data } = await axios.put<Product>(
			`/api/products/${product._id}`,
			product,
			config
		);
		dispatch({
			type: ProductUpdateActionTypes.PRODUCT_UPDATE_SUCCESS,
			payload: data
		});
	} catch (error) {
		dispatch({
			type: ProductUpdateActionTypes.PRODUCT_UPDATE_FAILURE,
			payload: errorHandler(error)
		});
	}
};

export const createProductReview = (
	prductId: string,
	review: { rating: number; comment: string }
): AppThunk => async (dispatch, getState) => {
	try {
		dispatch({
			type: ProductCreateReviewActionTypes.PRODUCT_CREATE_REVIEW_REQUEST
		});
		const { userInfo } = getState().userLogin;
		const config = {
			headers: {
				'Content-Type': 'Application/json',
				Authorization: `Bearer ${userInfo?.token}`
			}
		};
		await axios.post(`/api/products/${prductId}/reviews`, review, config);
		dispatch({
			type: ProductCreateReviewActionTypes.PRODUCT_CREATE_REVIEW_SUCCESS
		});
	} catch (error) {
		dispatch({
			type: ProductCreateReviewActionTypes.PRODUCT_CREATE_REVIEW_FAILURE,
			payload: errorHandler(error)
		});
	}
};

export const listTopProducts = (): AppThunk => async (dispatch) => {
	try {
		dispatch({ type: ProductTopActionTypes.PRODUCT_TOP_REQUEST });
		const { data } = await axios.get<Product[]>(`/api/products/top`);
		dispatch({
			type: ProductTopActionTypes.PRODUCT_TOP_SUCCESS,
			payload: data
		});
	} catch (error) {
		dispatch({
			type: ProductTopActionTypes.PRODUCT_TOP_FAILURE,
			payload: errorHandler(error)
		});
	}
};
