import * as types from './action-types';
import axios from 'axios';
import { createAction } from '@reduxjs/toolkit';
import { ExternalUrls } from '../../common/constants';

export const registerSuccess = createAction(types.REGISTER_SUCCESS);
export const registerFailure = createAction(types.REGISTER_FAILURE);
export const loginSuccess = createAction(types.LOGIN_SUCCESS);
export const loginFailure = createAction(types.LOGIN_FAILURE);
export const logout = createAction(types.LOGOUT_SUCCESS);
export const menuToggle = createAction(types.MENU_TOGGLE);

export const register = (email, password, name, image) => async (dispatch) => {
	try {
		// something like ...
		// const formData = new FormData();
		// formData.append('username', email);
		// formData.append('email', email);
		// formData.append('password', password);
		// formData.append('password', password);

		// const { data } = await axios({
		// 	method: 'post',
		// 	url: ExternalUrls.Users,
		// 	data: formData,
		// });

		const { data } = await axios({
			method: 'post',
			url: ExternalUrls.Users,
			data: {
				name: name,
				email: email,
				password: password,
				image: image, // getting empty object
			},
		});
		dispatch(registerSuccess(data));
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
		dispatch(loginSuccess(data));
	} catch (error) {
		dispatch(loginFailure(error));
	}
};
