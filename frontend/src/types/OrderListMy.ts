import { PaymentResult } from '.';
import { Order } from './Order';

export interface OrderListMy extends Order {
	_id: string;
	user: string;
	isPaid: boolean;
	isDelivered: boolean;
	paidAt?: string;
	deliveredAt?: string;
	createdAt: string;
	paymentResult?: PaymentResult;
}

export interface OrderListMyState {
	orders: OrderListMy[];
	loading: boolean;
	error?: any;
}

export enum OrderListMyActionTypes {
	ODRER_LIST_MY_REQUEST = 'ODRER_LIST_MY_REQUEST',
	ODRER_LIST_MY_SUCCESS = 'ODRER_LIST_MY_SUCCESS',
	ODRER_LIST_MY_FAILURE = 'ODRER_LIST_MY_FAILURE'
}

export interface OrderListMyRequestAction {
	type: OrderListMyActionTypes.ODRER_LIST_MY_REQUEST;
}

export interface OrderListMySuccessAction {
	type: OrderListMyActionTypes.ODRER_LIST_MY_SUCCESS;
	payload: OrderListMy[];
}

export interface OrderListMyFailureAction {
	type: OrderListMyActionTypes.ODRER_LIST_MY_FAILURE;
	payload: any;
}

export type OrderListMyAction =
	| OrderListMyRequestAction
	| OrderListMySuccessAction
	| OrderListMyFailureAction;
