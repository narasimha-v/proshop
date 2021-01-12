import {
	ProductListState,
	ProductDetailsState,
	CartState,
	UserLoginState
} from '.';

export interface ReduxState {
	productList: ProductListState;
	productDetails: ProductDetailsState;
	cart: CartState;
	userLogin: UserLoginState;
}
