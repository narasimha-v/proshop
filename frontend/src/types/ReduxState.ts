import {
	ProductListState,
	ProductDetailsState,
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
	OrderListMyState
} from '.';
import { UserUpdateState } from './UserUpdate';

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
	userList: UserListState;
	userDelete: UserDeleteState;
	userUpdate: UserUpdateState;
}
