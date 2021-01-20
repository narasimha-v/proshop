import axios from 'axios';

import { errorHandler } from '.';
import { AppThunk } from '../store';
import {
	CartActionTypes,
	Order,
	OrderCreate,
	OrderCreateActionTypes,
	OrderDetails,
	OrderDetailsActionTypes,
	OrderListMy,
	OrderListMyActionTypes,
	OrderPayActionTypes
} from '../types';

export const createOrder = (order: Order): AppThunk => async (
	dispatch,
	getState
) => {
	try {
		dispatch({ type: OrderCreateActionTypes.ODRER_CREATE_REQUEST });
		const { userInfo } = getState().userLogin;
		const config = {
			headers: {
				'Content-Type': 'Application/json',
				Authorization: `Bearer ${userInfo?.token}`
			}
		};
		const { data } = await axios.post<OrderCreate>(
			`/api/orders`,
			order,
			config
		);
		dispatch({
			type: OrderCreateActionTypes.ODRER_CREATE_SUCCESS,
			payload: data
		});
		localStorage.removeItem('cartItems');
		dispatch({
			type: CartActionTypes.CART_ITEMS_RESET
		});
	} catch (error) {
		dispatch({
			type: OrderCreateActionTypes.ODRER_CREATE_FAILURE,
			payload: errorHandler(error)
		});
	}
};

export const getOrderDetails = (id: string): AppThunk => async (
	dispatch,
	getState
) => {
	try {
		dispatch({ type: OrderDetailsActionTypes.ODRER_DETAILS_REQUEST });
		const { userInfo } = getState().userLogin;
		const config = {
			headers: {
				'Content-Type': 'Application/json',
				Authorization: `Bearer ${userInfo?.token}`
			}
		};
		const { data } = await axios.get<OrderDetails>(`/api/orders/${id}`, config);
		dispatch({
			type: OrderDetailsActionTypes.ODRER_DETAILS_SUCCESS,
			payload: data
		});
	} catch (error) {
		dispatch({
			type: OrderDetailsActionTypes.ODRER_DETAILS_FAILURE,
			payload: errorHandler(error)
		});
	}
};

export interface PaymentResult {
	id: string;
	status: string;
	update_time: string;
	payer: { email_address: string };
}

export const payOrder = (
	orderId: string,
	paymentResult: PaymentResult
): AppThunk => async (dispatch, getState) => {
	try {
		dispatch({ type: OrderPayActionTypes.ODRER_PAY_REQUEST });
		const { userInfo } = getState().userLogin;
		const config = {
			headers: {
				'Content-Type': 'Application/json',
				Authorization: `Bearer ${userInfo?.token}`
			}
		};
		await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config);
		dispatch({
			type: OrderPayActionTypes.ODRER_PAY_SUCCESS
		});
	} catch (error) {
		dispatch({
			type: OrderPayActionTypes.ODRER_PAY_FAILURE,
			payload: errorHandler(error)
		});
	}
};

export const listMyOrders = (): AppThunk => async (dispatch, getState) => {
	try {
		dispatch({ type: OrderListMyActionTypes.ODRER_LIST_MY_REQUEST });
		const { userInfo } = getState().userLogin;
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo?.token}`
			}
		};
		const { data } = await axios.get<OrderListMy[]>(
			`/api/orders/myorders`,
			config
		);
		dispatch({
			type: OrderListMyActionTypes.ODRER_LIST_MY_SUCCESS,
			payload: data
		});
	} catch (error) {
		dispatch({
			type: OrderListMyActionTypes.ODRER_LIST_MY_FAILURE,
			payload: errorHandler(error)
		});
	}
};
