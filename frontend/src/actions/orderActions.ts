import axios from 'axios';

import { errorHandler } from '.';
import { AppThunk } from '../store';
import {
	CreateOrder,
	CreateOrderWithUser,
	OrderCreateActionTypes
} from '../types';

export const createOrder = (order: CreateOrder): AppThunk => async (
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
		const { data } = await axios.post<CreateOrderWithUser>(
			`/api/orders`,
			order,
			config
		);
		dispatch({
			type: OrderCreateActionTypes.ODRER_CREATE_SUCCESS,
			payload: data
		});
	} catch (error) {
		dispatch({
			type: OrderCreateActionTypes.ODRER_CREATE_FAILURE,
			payload: errorHandler(error)
		});
	}
};
