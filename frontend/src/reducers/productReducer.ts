import {
	ProductListAction,
	ProductListActionTypes,
	ProductListState,
	ProductDetailsAction,
	ProductDetailsActionTypes,
	ProductDetailsState,
	ProductDeleteAction,
	ProductDeleteActionTypes,
	ProductDeleteState,
	ProductCreateState,
	ProductCreateAction,
	ProductCreateActionTypes,
	ProductUpdateAction,
	ProductUpdateState,
	ProductUpdateActionTypes,
	ProductCreateReviewState,
	ProductCreateReviewAction,
	ProductCreateReviewActionTypes,
	ProductTopState,
	ProductTopAction,
	ProductTopActionTypes
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
				products: action.payload.products,
				pages: action.payload.pages,
				page: action.payload.page
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

const initialProductCreateState: ProductCreateState = {
	loading: false
};

export const productCreateReducer = (
	state: ProductCreateState = initialProductCreateState,
	action: ProductCreateAction
) => {
	switch (action.type) {
		case ProductCreateActionTypes.PRODUCT_CREATE_REQUEST:
			return { loading: true };
		case ProductCreateActionTypes.PRODUCT_CREATE_SUCCESS:
			return {
				loading: initialProductCreateState.loading,
				success: true,
				product: action.payload
			};
		case ProductCreateActionTypes.PRODUCT_CREATE_FAILURE:
			return {
				error: action.payload
			};
		case ProductCreateActionTypes.PRODUCT_CREATE_RESET:
			return {};
		default:
			return state;
	}
};

const initialProductUpdateState: ProductUpdateState = {
	loading: false
};

export const productUpdateReducer = (
	state: ProductUpdateState = initialProductUpdateState,
	action: ProductUpdateAction
) => {
	switch (action.type) {
		case ProductUpdateActionTypes.PRODUCT_UPDATE_REQUEST:
			return { loading: true };
		case ProductUpdateActionTypes.PRODUCT_UPDATE_SUCCESS:
			return {
				loading: initialProductUpdateState.loading,
				success: true,
				product: action.payload
			};
		case ProductUpdateActionTypes.PRODUCT_UPDATE_FAILURE:
			return {
				error: action.payload
			};
		case ProductUpdateActionTypes.PRODUCT_UPDATE_RESET:
			return {};
		default:
			return state;
	}
};

const initialProductCreateReviewState: ProductCreateReviewState = {
	loading: false
};

export const productCreateReviewReducer = (
	state: ProductCreateReviewState = initialProductCreateReviewState,
	action: ProductCreateReviewAction
) => {
	switch (action.type) {
		case ProductCreateReviewActionTypes.PRODUCT_CREATE_REVIEW_REQUEST:
			return { loading: true };
		case ProductCreateReviewActionTypes.PRODUCT_CREATE_REVIEW_SUCCESS:
			return {
				loading: initialProductCreateReviewState.loading,
				success: true
			};
		case ProductCreateReviewActionTypes.PRODUCT_CREATE_REVIEW_FAILURE:
			return {
				error: action.payload
			};
		case ProductCreateReviewActionTypes.PRODUCT_CREATE_REVIEW_RESET:
			return {};
		default:
			return state;
	}
};

const initialProductTopState: ProductTopState = {
	products: [],
	loading: false
};

export const productTopRatedReducer = (
	state: ProductTopState = initialProductTopState,
	action: ProductTopAction
) => {
	switch (action.type) {
		case ProductTopActionTypes.PRODUCT_TOP_REQUEST:
			return { loading: true, products: initialProductTopState.products };
		case ProductTopActionTypes.PRODUCT_TOP_SUCCESS:
			return {
				loading: initialProductTopState.loading,
				products: action.payload
			};
		case ProductTopActionTypes.PRODUCT_TOP_FAILURE:
			return {
				products: initialProductListState.products,
				error: action.payload
			};
		default:
			return state;
	}
};
