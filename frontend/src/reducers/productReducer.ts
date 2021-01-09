import { ProductAction, ProductActionTypes, ProductState } from '../types';

const initialState: ProductState = {
	products: [],
	loading: false
};

export const productListReducer = (
	state: ProductState = initialState,
	action: ProductAction
) => {
	switch (action.type) {
		case ProductActionTypes.PRODUCT_LIST_REQUEST:
			return { loading: true, products: [] };
		case ProductActionTypes.PRODUCT_LIST_SUCCESS:
			return { loading: false, products: action.payload };
		case ProductActionTypes.PRODUCT_LIST_FAILURE:
			return { loading: false, products: [], error: action.payload };
		default:
			return state;
	}
};
