import {
	OrderCreateActionTypes,
	OrderCreateAction,
	OrderCreateState,
	OrderDetailsActionTypes,
	OrderDetailsAction,
	OrderDetailsState,
	OrderPayActionTypes,
	OrderPayAction,
	OrderPayState,
	OrderListMyState,
	OrderListMyAction,
	OrderListMyActionTypes
} from '../types';

const orderCreateReducerInitialState: OrderCreateState = {
	loading: false
};

export const orderCreateReducer = (
	state = orderCreateReducerInitialState,
	action: OrderCreateAction
) => {
	switch (action.type) {
		case OrderCreateActionTypes.ODRER_CREATE_REQUEST:
			return { loading: true };
		case OrderCreateActionTypes.ODRER_CREATE_SUCCESS:
			return { loading: false, success: true, order: action.payload };
		case OrderCreateActionTypes.ODRER_CREATE_FAILURE:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

const orderDetailsReducerInitialState: OrderDetailsState = {
	loading: false
};

export const orderDetailsReducer = (
	state = orderDetailsReducerInitialState,
	action: OrderDetailsAction
) => {
	switch (action.type) {
		case OrderDetailsActionTypes.ODRER_DETAILS_REQUEST:
			return { ...state, loading: true };
		case OrderDetailsActionTypes.ODRER_DETAILS_SUCCESS:
			return { loading: false, order: action.payload };
		case OrderDetailsActionTypes.ODRER_DETAILS_FAILURE:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

const orderPayReducerInitialState: OrderPayState = {
	loading: false
};

export const orderPayReducer = (
	state = orderPayReducerInitialState,
	action: OrderPayAction
) => {
	switch (action.type) {
		case OrderPayActionTypes.ODRER_PAY_REQUEST:
			return { ...state, loading: true };
		case OrderPayActionTypes.ODRER_PAY_SUCCESS:
			return { loading: false, success: true };
		case OrderPayActionTypes.ODRER_PAY_FAILURE:
			return { loading: false, error: action.payload };
		case OrderPayActionTypes.ORDER_PAY_RESET:
			return {};
		default:
			return state;
	}
};

const orderListMyReducerInitialState: OrderListMyState = {
	orders: [],
	loading: false
};

export const orderListMyReducer = (
	state = orderListMyReducerInitialState,
	action: OrderListMyAction
) => {
	switch (action.type) {
		case OrderListMyActionTypes.ODRER_LIST_MY_REQUEST:
			return { loading: true, orders: state.orders };
		case OrderListMyActionTypes.ODRER_LIST_MY_SUCCESS:
			return { loading: false, orders: action.payload };
		case OrderListMyActionTypes.ODRER_LIST_MY_FAILURE:
			return { loading: false, error: action.payload, orders: state.orders };
		case OrderListMyActionTypes.ODRER_LIST_MY_RESET:
			return { loading: false, orders: [] };
		default:
			return state;
	}
};
