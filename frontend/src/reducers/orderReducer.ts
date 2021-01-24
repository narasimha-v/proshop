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
	OrderListMyActionTypes,
	OrderListAction,
	OrderListActionTypes,
	OrderListState,
	OrderDeliverState,
	OrderDeliverAction,
	OrderDeliverActionTypes
} from '../types';

const orderCreateReducerInitialState: OrderCreateState = {
	loading: false
};

export const orderCreateReducer = (
	state: OrderCreateState = orderCreateReducerInitialState,
	action: OrderCreateAction
) => {
	switch (action.type) {
		case OrderCreateActionTypes.ORDER_CREATE_REQUEST:
			return { loading: true };
		case OrderCreateActionTypes.ORDER_CREATE_SUCCESS:
			return { loading: false, success: true, order: action.payload };
		case OrderCreateActionTypes.ORDER_CREATE_FAILURE:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

const orderDetailsReducerInitialState: OrderDetailsState = {
	loading: false
};

export const orderDetailsReducer = (
	state: OrderDetailsState = orderDetailsReducerInitialState,
	action: OrderDetailsAction
) => {
	switch (action.type) {
		case OrderDetailsActionTypes.ORDER_DETAILS_REQUEST:
			return { ...state, loading: true };
		case OrderDetailsActionTypes.ORDER_DETAILS_SUCCESS:
			return { loading: false, order: action.payload };
		case OrderDetailsActionTypes.ORDER_DETAILS_FAILURE:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

const orderPayReducerInitialState: OrderPayState = {
	loading: false
};

export const orderPayReducer = (
	state: OrderPayState = orderPayReducerInitialState,
	action: OrderPayAction
) => {
	switch (action.type) {
		case OrderPayActionTypes.ORDER_PAY_REQUEST:
			return { ...state, loading: true };
		case OrderPayActionTypes.ORDER_PAY_SUCCESS:
			return { loading: false, success: true };
		case OrderPayActionTypes.ORDER_PAY_FAILURE:
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
	state: OrderListMyState = orderListMyReducerInitialState,
	action: OrderListMyAction
) => {
	switch (action.type) {
		case OrderListMyActionTypes.ORDER_LIST_MY_REQUEST:
			return { loading: true, orders: state.orders };
		case OrderListMyActionTypes.ORDER_LIST_MY_SUCCESS:
			return { loading: false, orders: action.payload };
		case OrderListMyActionTypes.ORDER_LIST_MY_FAILURE:
			return { loading: false, error: action.payload, orders: state.orders };
		case OrderListMyActionTypes.ORDER_LIST_MY_RESET:
			return { loading: false, orders: [] };
		default:
			return state;
	}
};

const orderListReducerInitialState: OrderListState = {
	orders: [],
	loading: false
};

export const orderListReducer = (
	state: OrderListState = orderListReducerInitialState,
	action: OrderListAction
) => {
	switch (action.type) {
		case OrderListActionTypes.ORDER_LIST_REQUEST:
			return { loading: true, orders: state.orders };
		case OrderListActionTypes.ORDER_LIST_SUCCESS:
			return { loading: false, orders: action.payload };
		case OrderListActionTypes.ORDER_LIST_FAILURE:
			return { loading: false, error: action.payload, orders: state.orders };
		default:
			return state;
	}
};

const orderDeliverReducerInitialState: OrderDeliverState = {
	loading: false
};

export const orderDeliverReducer = (
	state: OrderDeliverState = orderDeliverReducerInitialState,
	action: OrderDeliverAction
) => {
	switch (action.type) {
		case OrderDeliverActionTypes.ORDER_DELIVER_REQUEST:
			return { ...state, loading: true };
		case OrderDeliverActionTypes.ORDER_DELIVER_SUCCESS:
			return { loading: false, success: true };
		case OrderDeliverActionTypes.ORDER_DELIVER_FAILURE:
			return { loading: false, error: action.payload };
		case OrderDeliverActionTypes.ORDER_DELIVER_RESET:
			return {};
		default:
			return state;
	}
};
