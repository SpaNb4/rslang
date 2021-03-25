import * as types from './action-types';
import { createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ExternalUrls } from '../../common/constants';
import { buildUrl } from '../../common/helpers';

export const fetchUserWordsSuccess = createAction(types.FETCH_USER_WORDS_SUCCESS);
export const createUserWordSuccess = createAction(types.CREATE_USER_WORD_SUCCESS);
export const deleteUserWordSuccess = createAction(types.DELETE_USER_WORD_SUCCESS);
export const fetchUserWordsFailure = createAction(types.FETCH_USER_WORDS_FAILURE);
export const createUserWordFailure = createAction(types.CREATE_USER_WORD_FAILURE);
export const deleteUserWordFailure = createAction(types.DELETE_USER_WORD_FAILURE);
export const showLoader = createAction(types.SHOW_LOADER);
export const hideLoader = createAction(types.HIDE_LOADER);

export const fetchUserWords = (userId, token) => async (dispatch) => {
	try {
		dispatch(showLoader());
		const { data } = await axios({
			method: 'get',
			url: buildUrl(ExternalUrls.Users, '/', userId, '/words'),
			params: {
				id: userId,
			},
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		dispatch(fetchUserWordsSuccess(data));
		dispatch(hideLoader());
	} catch (error) {
		dispatch(fetchUserWordsFailure(error));
	}
};

export const setUserWord = (userId, token, wordData, section) => async (dispatch) => {
	const wordId = wordData.id || wordData._id;
	try {
		const { data } = await axios({
			method: 'post',
			url: buildUrl(ExternalUrls.Users, '/', userId, '/words/', wordId),
			params: {
				id: userId,
				wordId: wordId,
			},
			data: {
				difficulty: section,
				optional: wordData,
			},
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		dispatch(createUserWordSuccess(data));
	} catch (error) {
		dispatch(createUserWordFailure(error));
	}
};

export const updateUserWord = (userId, token, wordData, section) => async (dispatch) => {
	const wordId = wordData.id || wordData._id;
	try {
		const { data } = await axios({
			method: 'put',
			url: buildUrl(ExternalUrls.Users, '/', userId, '/words/', wordId),
			params: {
				id: userId,
				wordId: wordId,
			},
			data: {
				difficulty: section,
				optional: wordData,
			},
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		dispatch(createUserWordSuccess(data));
	} catch (error) {
		dispatch(createUserWordFailure(error));
	}
};

export const removeUserWord = (userId, token, wordData) => async (dispatch) => {
	const wordId = wordData.id || wordData._id;
	try {
		const { data } = await axios({
			method: 'delete',
			url: buildUrl(ExternalUrls.Users, '/', userId, '/words/', wordId),
			params: {
				id: userId,
				wordId: wordId,
			},
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		dispatch(createUserWordSuccess(data));
	} catch (error) {
		dispatch(createUserWordFailure(error));
	}
};
