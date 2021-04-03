import * as types from './action-types';
import axios from 'axios';
import { createAction } from '@reduxjs/toolkit';
import { ExternalUrls, LocalStorageKeys, JWT_EXPIRE_TIME } from '../../common/constants';
import { clearUserWords } from '../dictionary/actions';
import { clearAggregatedWords } from '../book/actions';

export const registerSuccess = createAction(types.REGISTER_SUCCESS);
export const loginSuccess = createAction(types.LOGIN_SUCCESS);
export const logoutSuccess = createAction(types.LOGOUT_SUCCESS);
export const saveUserAuthData = createAction(types.SAVE_USER_AUTH_DATA);
export const menuToggle = createAction(types.MENU_TOGGLE);
export const clearErrorMessage = createAction(types.CLEAR_ERROR_MESSAGE);
export const updateErrorMessage = createAction(types.UPDATE_ERROR_MESSAGE);
export const updateUserErrorMessage = createAction(types.UPDATE_USER_ERROR_MESSAGE);

export const register = (email, password, username, image) => async (dispatch) => {
	try {
		const imgFormData = new FormData();
		imgFormData.append('file', image);
		imgFormData.append('upload_preset', 'gfyjsw4r');
		const response = await axios({
			method: 'post',
			url: 'https://api.cloudinary.com/v1_1/imisha/image/upload',
			data: imgFormData,
		});
		const imgURL = response.data.url;

		const { data } = await axios({
			method: 'post',
			url: ExternalUrls.Users,
			data: {
				username: username,
				email: email,
				password: password,
				image: imgURL,
			},
		});
		dispatch(clearErrorMessage());
		dispatch(login(data.email, password));
	} catch (error) {
		if (error.response && error.response.status === 417) {
			dispatch(updateUserErrorMessage('Пользователь с таким email уже существует.'));
		} else if (error.response && error.response.status === 422) {
			dispatch(updateUserErrorMessage('Пароль должен быть не менее 8 символов.'));
		} else {
			dispatch(updateErrorMessage(error.message));
		}
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

		dispatch(loginSuccess(data));
		dispatch(clearErrorMessage());
	} catch (error) {
		if (error.response && error.response.status === 404) {
			dispatch(updateUserErrorMessage('Введен неверный email или пользователь не зарегистрирован.'));
		} else if (error.response && error.response.status === 403) {
			dispatch(updateUserErrorMessage('Введен неверный пароль.'));
		} else {
			dispatch(updateErrorMessage(error.message));
		}
	}
};

export const logout = () => async (dispatch) => {
	dispatch(logoutSuccess());
	dispatch(clearUserWords());
	dispatch(clearAggregatedWords());
	localStorage.removeItem(LocalStorageKeys.User);
	localStorage.removeItem(LocalStorageKeys.TokenExpireTime);
	localStorage.removeItem(LocalStorageKeys.BookPage);
};
