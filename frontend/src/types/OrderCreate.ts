import { Cart, ShippingAddress } from '.';

export interface CreateOrder {
	orderItems: Cart[];
	shippingAddress: ShippingAddress;
	paymentMethod: string;
	itemsPrice: number;
	taxPrice: number;
	shippingPrice: number;
	totalPrice: number;
}

export interface CreateOrderWithUser extends CreateOrder {
	_id: string;
	user: string;
}

export interface OrderCreateState {
	loading: boolean;
	order?: CreateOrderWithUser;
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
	payload: CreateOrderWithUser;
}

export interface OrderCreateFailureAction {
	type: OrderCreateActionTypes.ODRER_CREATE_FAILURE;
	payload: any;
}

export type OrderCreateAction =
	| OrderCreateRequestAction
	| OrderCreateSuccessAction
	| OrderCreateFailureAction;
