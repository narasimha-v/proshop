import {
	ProductListAction,
	ProductListActionTypes,
	ProductListState,
	ProductDetailsAction,
	ProductDetailsActionTypes,
	ProductDetailsState,
	ProductDeleteAction,
	ProductDeleteActionTypes,
	ProductDeleteState
} from '../types';

const initialProductListState: ProductListState = {
	products: [],
	loading: false
};

export const productListReducer = (
	state: ProductListState = initialProductListState,
	action: ProductListAction
) => {
	switch (action.type) {
		case ProductListActionTypes.PRODUCT_LIST_REQUEST:
			return { loading: true, products: initialProductListState.products };
		case ProductListActionTypes.PRODUCT_LIST_SUCCESS:
			return {
				loading: initialProductListState.loading,
				products: action.payload
			};
		case ProductListActionTypes.PRODUCT_LIST_FAILURE:
			return {
				loading: initialProductListState.loading,
				products: initialProductListState.products,
				error: action.payload
			};
		default:
			return state;
	}
};

const initialProductDetailsState: ProductDetailsState = {
	loading: false
};

export const productDetailsReducer = (
	state: ProductDetailsState = initialProductDetailsState,
	action: ProductDetailsAction
) => {
	switch (action.type) {
		case ProductDetailsActionTypes.PRODUCT_DETAILS_REQUEST:
			return { loading: true, product: initialProductDetailsState.product };
		case ProductDetailsActionTypes.PRODUCT_DETAILS_SUCCESS:
			return {
				loading: initialProductDetailsState.loading,
				product: action.payload
			};
		case ProductDetailsActionTypes.PRODUCT_DETAILS_FAILURE:
			return {
				loading: initialProductDetailsState.loading,
				product: initialProductDetailsState.product,
				error: action.payload
			};
		default:
			return state;
	}
};

const initialProductDeleteState: ProductDeleteState = {
	loading: false
};

export const productDeleteReducer = (
	state: ProductDeleteState = initialProductDeleteState,
	action: ProductDeleteAction
) => {
	switch (action.type) {
		case ProductDeleteActionTypes.PRODUCT_DELETE_REQUEST:
			return { loading: true };
		case ProductDeleteActionTypes.PRODUCT_DELETE_SUCCESS:
			return {
				loading: initialProductDeleteState.loading,
				success: true
			};
		case ProductDeleteActionTypes.PRODUCT_DELETE_FAILURE:
			return {
				error: action.payload
			};
		default:
			return state;
	}
};
