import * as types from './action-types';
import axios from 'axios';
import { createAction } from '@reduxjs/toolkit';
import { ExternalUrls, LocalStorageKeys, JWT_EXPIRE_TIME, JWT_REFRESH_EXPIRE_TIME } from '../../common/constants';
import { buildUrl } from '../../common/helpers';

export const registerSuccess = createAction(types.REGISTER_SUCCESS);
export const registerFailure = createAction(types.REGISTER_FAILURE);
export const loginSuccess = createAction(types.LOGIN_SUCCESS);
export const loginFailure = createAction(types.LOGIN_FAILURE);
export const logout = createAction(types.LOGOUT_SUCCESS);
export const saveUserAuthData = createAction(types.SAVE_USER_AUTH_DATA);
export const menuToggle = createAction(types.MENU_TOGGLE);

export const register = (email, password, username, image) => async (dispatch) => {
	try {
		const formData = new FormData();
		formData.append('username', username);
		formData.append('email', email);
		formData.append('password', password);
		formData.append('image', image);

		const { data } = await axios({
			method: 'post',
			url: ExternalUrls.Users,
			data: formData,
		});
		localStorage.setItem(LocalStorageKeys.Avatar, JSON.stringify(data.image));
		dispatch(login(email, password));
	} catch (error) {
		dispatch(registerFailure(error));
	}
};

export const login = (email, password) => async (dispatch) => {
	try {
		const { data } = await axios({
			method: 'post',
			url: ExternalUrls.SignIn,
			data: {
				email: email,
				password: password,
			},
		});
		localStorage.setItem(LocalStorageKeys.User, JSON.stringify(data));

		const tokenExpireTime = JWT_EXPIRE_TIME + Date.now();
		localStorage.setItem(LocalStorageKeys.TokenExpireTime, JSON.stringify(tokenExpireTime));
		const refreshTokenExpireTime = JWT_REFRESH_EXPIRE_TIME + Date.now();
		localStorage.setItem(LocalStorageKeys.RefreshTokenExpireTime, JSON.stringify(refreshTokenExpireTime));

		dispatch(loginSuccess(data));
	} catch (error) {
		dispatch(loginFailure(error));
	}
};

export const refreshToken = (userId, refreshToken) => async () => {
	try {
		const { data } = await axios({
			method: 'get',
			url: buildUrl(ExternalUrls.Users, '/', userId, '/tokens'),
			params: {
				id: userId,
				tokenId: refreshToken,
			},
			headers: {
				Authorization: `Bearer ${refreshToken}`,
			},
		});
		console.log(data);
		// dispatch(loginSuccess(data));
	} catch (error) {
		console.log(error);
		// dispatch(loginFailure(error));
	}
};
