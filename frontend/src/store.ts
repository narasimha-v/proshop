import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware, Action } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { ReduxState } from './types';
import { productListReducer } from './reducers';

export type AppDispatch = ThunkDispatch<ReduxState, unknown, Action<string>>;
export type AppThunk = ThunkAction<
	Promise<void>,
	ReduxState,
	unknown,
	Action<string>
>;

const reducer = combineReducers<ReduxState>({
	productList: productListReducer
});

const initialState = {};
const middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
