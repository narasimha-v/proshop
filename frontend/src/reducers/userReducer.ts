import {
	UserLoginState,
	UserLoginActionTypes,
	UserLoginAction,
	UserRegisterState,
	UserRegisterActionTypes,
	UserRegisterAction,
	UserDetailsState,
	UserDetailsAction,
	UserDetailsActionTypes,
	UserUpdateProfileState,
	UserUpdateProfileAction,
	UserUpdateProfileActionTypes
} from '../types';

const userLoginReducerInitialState: UserLoginState = {
	loading: false
};

export const userLoginReducer = (
	state: UserLoginState = userLoginReducerInitialState,
	action: UserLoginAction
) => {
	switch (action.type) {
		case UserLoginActionTypes.USER_LOGIN_REQUEST:
			return { loading: true };
		case UserLoginActionTypes.USER_LOGIN_SUCCESS:
			return {
				loading: userLoginReducerInitialState.loading,
				userInfo: action.payload
			};
		case UserLoginActionTypes.USER_LOGIN_FAILURE:
			return {
				loading: userLoginReducerInitialState.loading,
				error: action.payload
			};
		case UserLoginActionTypes.USER_LOGOUT:
			return {};
		default:
			return state;
	}
};

const userRegisterReducerInitialState: UserRegisterState = {
	loading: false
};

export const userRegisterReducer = (
	state: UserRegisterState = userRegisterReducerInitialState,
	action: UserRegisterAction
) => {
	switch (action.type) {
		case UserRegisterActionTypes.USER_REGISTER_REQUEST:
			return { loading: true };
		case UserRegisterActionTypes.USER_REGISTER_SUCCESS:
			return {
				loading: userRegisterReducerInitialState.loading,
				userInfo: action.payload
			};
		case UserRegisterActionTypes.USER_REGISTER_FAILURE:
			return {
				loading: userRegisterReducerInitialState.loading,
				error: action.payload
			};
		default:
			return state;
	}
};

const userDetailsReducerInitialState: UserDetailsState = {
	loading: false
};

export const userDetailsReducer = (
	state: UserDetailsState = userDetailsReducerInitialState,
	action: UserDetailsAction
) => {
	switch (action.type) {
		case UserDetailsActionTypes.USER_DETAILS_REQUEST:
			return { loading: true };
		case UserDetailsActionTypes.USER_DETAILS_SUCCESS:
			return {
				loading: userDetailsReducerInitialState.loading,
				user: action.payload
			};
		case UserDetailsActionTypes.USER_DETAILS_FAILURE:
			return {
				loading: userDetailsReducerInitialState.loading,
				error: action.payload
			};
		case UserDetailsActionTypes.USER_DETAILS_RESET:
			return {};
		default:
			return state;
	}
};

const userUpdateProfileReducerInitialState: UserUpdateProfileState = {
	loading: false
};

export const userUpdateProfileReducer = (
	state: UserUpdateProfileState = userUpdateProfileReducerInitialState,
	action: UserUpdateProfileAction
) => {
	switch (action.type) {
		case UserUpdateProfileActionTypes.USER_UPDATE_PROFILE_REQUEST:
			return { loading: true };
		case UserUpdateProfileActionTypes.USER_UPDATE_PROFILE_SUCCESS:
			return {
				loading: userUpdateProfileReducerInitialState.loading,
				userInfo: action.payload,
				success: true
			};
		case UserUpdateProfileActionTypes.USER_UPDATE_PROFILE_FAILURE:
			return {
				loading: userUpdateProfileReducerInitialState.loading,
				error: action.payload
			};
		case UserUpdateProfileActionTypes.USER_UPDATE_PROFILE_RESET:
			return {};
		default:
			return state;
	}
};
