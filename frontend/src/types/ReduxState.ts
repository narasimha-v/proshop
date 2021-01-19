import {
	ProductListState,
	ProductDetailsState,
	CartState,
	UserLoginState,
	UserRegisterState,
	UserDetailsState,
	UserUpdateProfileState,
	OrderCreateState,
	OrderDetailsState,
	OrderPayState,
	OrderListMyState
} from '.';

export interface ReduxState {
	productList: ProductListState;
	productDetails: ProductDetailsState;
	cart: CartState;
	userLogin: UserLoginState;
	userRegister: UserRegisterState;
	userDetails: UserDetailsState;
	userUpdateProfile: UserUpdateProfileState;
	orderCreate: OrderCreateState;
	orderDetails: OrderDetailsState;
	orderPay: OrderPayState;
	orderListMy: OrderListMyState;
}
