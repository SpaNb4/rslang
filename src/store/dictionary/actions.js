import * as types from './action-types';
import { createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ExternalUrls } from '../../common/constants';

export const fetchUserWordsSuccess = createAction(types.FETCH_USER_WORDS_FAILURE);
export const fetchUserWordsFailure = createAction(types.FETCH_USER_WORDS_SUCCESS);
export const showLoader = createAction(types.SHOW_LOADER);
export const hideLoader = createAction(types.HIDE_LOADER);

export const fetchUserWords = (userId) => async (dispatch) => {
	try {
		dispatch(showLoader());
		const response = await axios(ExternalUrls.UserWords, { params: { id: userId } });
		const userWords = response.data;
		dispatch(fetchUserWordsSuccess(userWords));
		dispatch(hideLoader());
	} catch (error) {
		dispatch(fetchUserWordsFailure(error));
	}
};
