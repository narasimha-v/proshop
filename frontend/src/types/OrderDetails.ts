import { Order } from './Order';

export interface PaymentResult {
	id: string;
	status: string;
	update_time: string;
	email_address: string;
}

export interface OrderDetails extends Order {
	_id: string;
	user: {
		_id: string;
		name: string;
		email: string;
	};
	isPaid: boolean;
	isDelivered: boolean;
	paidAt?: string;
	deliveredAt?: string;
	paymentResult?: PaymentResult;
}

export interface OrderDetailsState {
	loading: boolean;
	order?: OrderDetails;
	error?: any;
}

export enum OrderDetailsActionTypes {
	ODRER_DETAILS_REQUEST = 'ODRER_DETAILS_REQUEST',
	ODRER_DETAILS_SUCCESS = 'ODRER_DETAILS_SUCCESS',
	ODRER_DETAILS_FAILURE = 'ODRER_DETAILS_FAILURE'
}

export interface OrderDetailsRequestAction {
	type: OrderDetailsActionTypes.ODRER_DETAILS_REQUEST;
}

export interface OrderDetailsSuccessAction {
	type: OrderDetailsActionTypes.ODRER_DETAILS_SUCCESS;
	payload: OrderDetails;
}

export interface OrderDetailsFailureAction {
	type: OrderDetailsActionTypes.ODRER_DETAILS_FAILURE;
	payload: any;
}

export type OrderDetailsAction =
	| OrderDetailsRequestAction
	| OrderDetailsSuccessAction
	| OrderDetailsFailureAction;
