import { CartAction, CartActionTypes, CartState } from '../types';

const initialState: CartState = {
	cartItems: []
};

export const cartReducer = (state = initialState, action: CartAction) => {
	switch (action.type) {
		case CartActionTypes.CART_ADD_ITEM:
			const item = action.payload;
			const existItem = state.cartItems.find((i) => i.product === item.product);
			if (existItem)
				return {
					...state,
					cartItems: state.cartItems.map((i) =>
						i.product === existItem.product ? item : i
					)
				};
			else return { ...state, cartItems: [...state.cartItems, item] };
		case CartActionTypes.CART_REMOVE_ITEM:
			return {
				...state,
				cartItems: state.cartItems.filter((i) => i.product !== action.payload)
			};
		default:
			return state;
	}
};
