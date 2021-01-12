import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware, Action } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { ReduxState } from './types';
import {
	productListReducer,
	productDetailsReducer,
	cartReducer,
	userLoginReducer
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
	userLogin: userLoginReducer
});

const cartItemsFromStorage = localStorage.getItem('cartItems');
const cartItems = cartItemsFromStorage ? JSON.parse(cartItemsFromStorage) : [];

const userInfoFromStorage = localStorage.getItem('userInfo');
const userInfo = userInfoFromStorage
	? JSON.parse(userInfoFromStorage)
	: undefined;

const initialState = {
	cart: { cartItems },
	userLogin: { userInfo }
};
const middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
