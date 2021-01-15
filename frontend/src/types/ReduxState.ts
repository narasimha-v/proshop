import {
	ProductListState,
	ProductDetailsState,
	CartState,
	UserLoginState,
	UserRegisterState,
	UserDetailsState,
	UserUpdateProfileState
} from '.';

export interface ReduxState {
	productList: ProductListState;
	productDetails: ProductDetailsState;
	cart: CartState;
	userLogin: UserLoginState;
	userRegister: UserRegisterState;
	userDetails: UserDetailsState;
	userUpdateProfile: UserUpdateProfileState;
}
