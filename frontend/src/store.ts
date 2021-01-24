import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware, Action } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { ReduxState } from './types';
import {
	productListReducer,
	productDetailsReducer,
	cartReducer,
	userLoginReducer,
	userRegisterReducer,
	userDetailsReducer,
	userUpdateProfileReducer,
	orderCreateReducer,
	orderDetailsReducer,
	orderPayReducer,
	orderListMyReducer,
	userListReducer,
	userDeleteReducer,
	userUpdateReducer,
	productDeleteReducer,
	productCreateReducer,
	productUpdateReducer,
	orderListReducer,
	orderDeliverReducer,
	productCreateReviewReducer,
	productTopRatedReducer
} from './reducers';

export type AppDispatch = ThunkDispatch<ReduxState, unknown, Action<string>>;
export type AppThunk = ThunkAction<
	Promise<void>,
	ReduxState,
	unknown,
	Action<string>
>;

const reducer = combineReducers<ReduxState>({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	cart: cartReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userDetails: userDetailsReducer,
	userUpdateProfile: userUpdateProfileReducer,
	orderCreate: orderCreateReducer,
	orderDetails: orderDetailsReducer,
	orderPay: orderPayReducer,
	orderListMy: orderListMyReducer,
	userList: userListReducer,
	userDelete: userDeleteReducer,
	userUpdate: userUpdateReducer,
	productDelete: productDeleteReducer,
	productCreate: productCreateReducer,
	ProductUpdate: productUpdateReducer,
	orderList: orderListReducer,
	orderDeliver: orderDeliverReducer,
	productCreateReview: productCreateReviewReducer,
	productTopRated: productTopRatedReducer
});

const cartItemsFromStorage = localStorage.getItem('cartItems');
const cartItems = cartItemsFromStorage ? JSON.parse(cartItemsFromStorage) : [];

const userInfoFromStorage = localStorage.getItem('userInfo');
const userInfo = userInfoFromStorage
	? JSON.parse(userInfoFromStorage)
	: undefined;

const shippingAddressFromStorage = localStorage.getItem('shippingAddress');
const shippingAddress = shippingAddressFromStorage
	? JSON.parse(shippingAddressFromStorage)
	: undefined;

const initialState = {
	cart: { cartItems, shippingAddress },
	userLogin: { userInfo }
};
const middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
