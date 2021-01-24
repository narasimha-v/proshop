import axios from 'axios';
import { errorHandler } from '.';

import { AppThunk } from '../store';
import {
	TokenUser,
	UserLoginActionTypes,
	UserRegisterActionTypes,
	UserDetailsActionTypes,
	User,
	UserUpdateProfileActionTypes,
	PasswordUser,
	OrderListMyActionTypes,
	UserDeleteActionTypes,
	UserUpdateActionTypes
} from '../types';
import { UserListActionTypes } from '../types/UserList';

export const login = (email: string, password: string): AppThunk => async (
	dispatch
) => {
	try {
		dispatch({ type: UserLoginActionTypes.USER_LOGIN_REQUEST });
		const config = {
			headers: { 'Content-Type': 'Application/json' }
		};
		const { data } = await axios.post<TokenUser>(
			'/api/users/login',
			{ email, password },
			config
		);
		dispatch({ type: UserLoginActionTypes.USER_LOGIN_SUCCESS, payload: data });
		localStorage.setItem('userInfo', JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: UserLoginActionTypes.USER_LOGIN_FAILURE,
			payload: errorHandler(error)
		});
	}
};

export const logout = (callback: () => void): AppThunk => async (dispatch) => {
	dispatch({ type: UserLoginActionTypes.USER_LOGOUT });
	dispatch({ type: OrderListMyActionTypes.ORDER_LIST_MY_RESET });
	dispatch({ type: UserDetailsActionTypes.USER_DETAILS_RESET });
	dispatch({ type: UserListActionTypes.USER_LIST_RESET });
	localStorage.removeItem('userInfo');
	callback();
};

export const register = (
	name: string,
	email: string,
	password: string
): AppThunk => async (dispatch) => {
	try {
		dispatch({ type: UserRegisterActionTypes.USER_REGISTER_REQUEST });
		const config = {
			headers: { 'Content-Type': 'Application/json' }
		};
		const { data } = await axios.post<TokenUser>(
			'/api/users',
			{ name, email, password },
			config
		);
		dispatch({
			type: UserRegisterActionTypes.USER_REGISTER_SUCCESS,
			payload: data
		});
		dispatch({
			type: UserLoginActionTypes.USER_LOGIN_SUCCESS,
			payload: data
		});
		localStorage.setItem('userInfo', JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: UserRegisterActionTypes.USER_REGISTER_FAILURE,
			payload: errorHandler(error)
		});
	}
};

export const getUserDetails = (id: string): AppThunk => async (
	dispatch,
	getState
) => {
	try {
		dispatch({ type: UserDetailsActionTypes.USER_DETAILS_REQUEST });
		const { userInfo } = getState().userLogin;
		const config = {
			headers: {
				'Content-Type': 'Application/json',
				Authorization: `Bearer ${userInfo?.token}`
			}
		};
		const { data } = await axios.get<User>(`/api/users/${id}`, config);
		dispatch({
			type: UserDetailsActionTypes.USER_DETAILS_SUCCESS,
			payload: data
		});
	} catch (error) {
		dispatch({
			type: UserDetailsActionTypes.USER_DETAILS_FAILURE,
			payload: errorHandler(error)
		});
	}
};

export const updateUserProfile = (user: PasswordUser): AppThunk => async (
	dispatch,
	getState
) => {
	try {
		dispatch({
			type: UserUpdateProfileActionTypes.USER_UPDATE_PROFILE_REQUEST
		});
		const { userInfo } = getState().userLogin;
		const config = {
			headers: {
				'Content-Type': 'Application/json',
				Authorization: `Bearer ${userInfo?.token}`
			}
		};
		const { data } = await axios.put<TokenUser>(
			`/api/users/profile`,
			user,
			config
		);
		dispatch({
			type: UserUpdateProfileActionTypes.USER_UPDATE_PROFILE_SUCCESS,
			payload: data
		});
		dispatch({
			type: UserLoginActionTypes.USER_LOGIN_SUCCESS,
			payload: data
		});
		localStorage.setItem('userInfo', JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: UserUpdateProfileActionTypes.USER_UPDATE_PROFILE_FAILURE,
			payload: errorHandler(error)
		});
	}
};

export const listUsers = (): AppThunk => async (dispatch, getState) => {
	try {
		dispatch({ type: UserListActionTypes.USER_LIST_REQUEST });
		const { userInfo } = getState().userLogin;
		const config = {
			headers: {
				'Content-Type': 'Application/json',
				Authorization: `Bearer ${userInfo?.token}`
			}
		};
		const { data } = await axios.get<User[]>(`/api/users/`, config);
		dispatch({
			type: UserListActionTypes.USER_LIST_SUCCESS,
			payload: data
		});
	} catch (error) {
		dispatch({
			type: UserListActionTypes.USER_LIST_FAILURE,
			payload: errorHandler(error)
		});
	}
};

export const deleteUser = (id: string): AppThunk => async (
	dispatch,
	getState
) => {
	try {
		dispatch({ type: UserDeleteActionTypes.USER_DELETE_REQUEST });
		const { userInfo } = getState().userLogin;
		const config = {
			headers: {
				'Content-Type': 'Application/json',
				Authorization: `Bearer ${userInfo?.token}`
			}
		};
		await axios.delete(`/api/users/${id}`, config);
		dispatch({ type: UserDeleteActionTypes.USER_DELETE_SUCCESS });
	} catch (error) {
		dispatch({
			type: UserDeleteActionTypes.USER_DELETE_FAILURE,
			payload: errorHandler(error)
		});
	}
};

export const updateUser = (user: User): AppThunk => async (
	dispatch,
	getState
) => {
	try {
		dispatch({
			type: UserUpdateActionTypes.USER_UPDATE_REQUEST
		});
		const { userInfo } = getState().userLogin;
		const config = {
			headers: {
				'Content-Type': 'Application/json',
				Authorization: `Bearer ${userInfo?.token}`
			}
		};
		await axios.put(`/api/users/${user._id}`, user, config);
		dispatch({
			type: UserUpdateActionTypes.USER_UPDATE_SUCCESS
		});
	} catch (error) {
		dispatch({
			type: UserUpdateActionTypes.USER_UPDATE_FAILURE,
			payload: errorHandler(error)
		});
	}
};
