import {
	UserLoginState,
	UserLoginActionTypes,
	UserLoginAction
} from '../types';

const initialState: UserLoginState = {
	loading: false
};

export const userLoginReducer = (
	state: UserLoginState = initialState,
	action: UserLoginAction
) => {
	switch (action.type) {
		case UserLoginActionTypes.USER_LOGIN_REQUEST:
			return { loading: true };
		case UserLoginActionTypes.USER_LOGIN_SUCCESS:
			return { loading: initialState.loading, userInfo: action.payload };
		case UserLoginActionTypes.USER_LOGIN_FAILURE:
			return { loading: initialState.loading, error: action.payload };
		case UserLoginActionTypes.USER_LOGOUT:
			return {};
		default:
			return state;
	}
};
