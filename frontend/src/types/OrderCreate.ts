import { Order } from './Order';

export interface OrderCreate extends Order {
	_id: string;
	user: string;
}

export interface OrderCreateState {
	loading: boolean;
	order?: OrderCreate;
	success?: boolean;
	error?: any;
}

export enum OrderCreateActionTypes {
	ODRER_CREATE_REQUEST = 'ODRER_CREATE_REQUEST',
	ODRER_CREATE_SUCCESS = 'ODRER_CREATE_SUCCESS',
	ODRER_CREATE_FAILURE = 'ODRER_CREATE_FAILURE'
}

export interface OrderCreateRequestAction {
	type: OrderCreateActionTypes.ODRER_CREATE_REQUEST;
}

export interface OrderCreateSuccessAction {
	type: OrderCreateActionTypes.ODRER_CREATE_SUCCESS;
	payload: OrderCreate;
}

export interface OrderCreateFailureAction {
	type: OrderCreateActionTypes.ODRER_CREATE_FAILURE;
	payload: any;
}

export type OrderCreateAction =
	| OrderCreateRequestAction
	| OrderCreateSuccessAction
	| OrderCreateFailureAction;
