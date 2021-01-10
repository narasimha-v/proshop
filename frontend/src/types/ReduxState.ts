import { ProductListState, ProductDetailsState, CartState } from '.';

export interface ReduxState {
	productList: ProductListState;
	productDetails: ProductDetailsState;
	cart: CartState;
}
