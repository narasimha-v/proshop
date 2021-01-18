export interface OrderPayState {
	loading?: boolean;
	success?: boolean;
	error?: any;
}

export enum OrderPayActionTypes {
	ODRER_PAY_REQUEST = 'ODRER_PAY_REQUEST',
	ODRER_PAY_SUCCESS = 'ODRER_PAY_SUCCESS',
	ODRER_PAY_FAILURE = 'ODRER_PAY_FAILURE',
	ORDER_PAY_RESET = 'ORDER_PAY_RESET'
}

export interface OrderPayRequestAction {
	type: OrderPayActionTypes.ODRER_PAY_REQUEST;
}

export interface OrderPaySuccessAction {
	type: OrderPayActionTypes.ODRER_PAY_SUCCESS;
}

export interface OrderPayFailureAction {
	type: OrderPayActionTypes.ODRER_PAY_FAILURE;
	payload: any;
}

export interface OrderPayResetAction {
	type: OrderPayActionTypes.ORDER_PAY_RESET;
}

export type OrderPayAction =
	| OrderPayRequestAction
	| OrderPaySuccessAction
	| OrderPayFailureAction
	| OrderPayResetAction;
