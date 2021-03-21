import * as types from './action-types';
import { createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ExternalUrls } from '../../common/constants';
import { buildUrl } from '../../common/helpers';

export const fetchUserWordsSuccess = createAction(types.FETCH_USER_WORDS_FAILURE);
export const fetchUserWordsFailure = createAction(types.FETCH_USER_WORDS_SUCCESS);
export const showLoader = createAction(types.SHOW_LOADER);
export const hideLoader = createAction(types.HIDE_LOADER);

export const fetchUserWords = (userId) => async (dispatch) => {
	try {
		dispatch(showLoader());
		const response = await axios(buildUrl(ExternalUrls.Users, userId, '/words'), { params: { id: userId } });
		const userWords = response.data;
		dispatch(fetchUserWordsSuccess(userWords));
		dispatch(hideLoader());
	} catch (error) {
		dispatch(fetchUserWordsFailure(error));
	}
};

export const setUserWord = (userId, token, wordData) => async () => {
	console.log(token);
	try {
		const { data } = await axios({
			method: 'post',
			url: `${buildUrl(ExternalUrls.Users, userId, '/words/', wordData.id)}`,
			data: {
				difficulty: 'hard',
				optional: wordData,
			},
			headers: {
				authorization: `${token}`,
			},
		});
		console.log(data);
	} catch (error) {
		console.log(error);
	}
};
