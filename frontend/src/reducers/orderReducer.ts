import {
	OrderCreateActionTypes,
	OrderCreateAction,
	OrderCreateState
} from '../types';

const orderReducerInitialState: OrderCreateState = {
	loading: false
};

export const orderCreateReducer = (
	state = orderReducerInitialState,
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
