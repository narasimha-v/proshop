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
	UserUpdateProfileActionTypes,
	UserListState,
	UserListAction,
	UserListActionTypes,
	UserDeleteState,
	UserDeleteAction,
	UserDeleteActionTypes,
	UserUpdateState,
	UserUpdateAction,
	UserUpdateActionTypes
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

const userListReducerInitialState: UserListState = {
	loading: false,
	users: []
};

export const userListReducer = (
	state: UserListState = userListReducerInitialState,
	action: UserListAction
) => {
	switch (action.type) {
		case UserListActionTypes.USER_LIST_REQUEST:
			return { loading: true, users: [] };
		case UserListActionTypes.USER_LIST_SUCCESS:
			return {
				loading: userListReducerInitialState.loading,
				users: action.payload
			};
		case UserListActionTypes.USER_LIST_FAILURE:
			return {
				loading: userListReducerInitialState.loading,
				error: action.payload,
				users: state.users
			};
		case UserListActionTypes.USER_LIST_RESET:
			return {
				loading: userListReducerInitialState.loading,
				users: []
			};
		default:
			return state;
	}
};

const userDetleteReducerInitialState: UserDeleteState = {
	loading: false
};

export const userDeleteReducer = (
	state: UserDeleteState = userDetleteReducerInitialState,
	action: UserDeleteAction
) => {
	switch (action.type) {
		case UserDeleteActionTypes.USER_DELETE_REQUEST:
			return { loading: true };
		case UserDeleteActionTypes.USER_DELETE_SUCCESS:
			return {
				loading: userDetleteReducerInitialState.loading,
				success: true
			};
		case UserDeleteActionTypes.USER_DELETE_FAILURE:
			return {
				loading: userDetleteReducerInitialState.loading,
				error: action.payload
			};
		default:
			return state;
	}
};

const userUpdateReducerInitialState: UserUpdateState = {
	loading: false
};

export const userUpdateReducer = (
	state: UserUpdateState = userUpdateReducerInitialState,
	action: UserUpdateAction
) => {
	switch (action.type) {
		case UserUpdateActionTypes.USER_UPDATE_REQUEST:
			return { loading: true };
		case UserUpdateActionTypes.USER_UPDATE_SUCCESS:
			return {
				loading: userUpdateReducerInitialState.loading,
				success: true
			};
		case UserUpdateActionTypes.USER_UPDATE_FAILURE:
			return {
				loading: userUpdateReducerInitialState.loading,
				error: action.payload
			};
		case UserUpdateActionTypes.USER_UPDATE_RESET:
			return {};
		default:
			return state;
	}
};
