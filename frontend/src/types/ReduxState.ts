import {
	ProductListState,
	ProductDetailsState,
	ProductDeleteState,
	ProductCreateState,
	ProductUpdateState,
	CartState,
	UserLoginState,
	UserRegisterState,
	UserDetailsState,
	UserListState,
	UserUpdateProfileState,
	UserDeleteState,
	OrderCreateState,
	OrderDetailsState,
	OrderPayState,
	OrderListMyState,
	UserUpdateState,
	OrderListState,
	OrderDeliverState,
	ProductCreateReviewState,
	ProductTopState
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
	orderList: OrderListState;
	userList: UserListState;
	userDelete: UserDeleteState;
	userUpdate: UserUpdateState;
	productDelete: ProductDeleteState;
	productCreate: ProductCreateState;
	ProductUpdate: ProductUpdateState;
	orderDeliver: OrderDeliverState;
	productCreateReview: ProductCreateReviewState;
	productTopRated: ProductTopState;
}
