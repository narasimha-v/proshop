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
	PasswordUser
} from '../types';

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

export const logout = (): AppThunk => async (dispatch) => {
	dispatch({ type: UserLoginActionTypes.USER_LOGOUT });
	localStorage.removeItem('userInfo');
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
