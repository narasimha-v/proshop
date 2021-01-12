import axios from 'axios';
import { errorHandler } from '.';

import { AppThunk } from '../store';
import { TokenUser, UserLoginActionTypes } from '../types';

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
