import * as types from './action-types';
import { createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ExternalUrls, DefaultValues } from '../../common/constants';

export const fetchWordsSuccess = createAction(types.FETCH_WORDS_SUCCESS);
export const fetchWordsFailure = createAction(types.FETCH_WORDS_FAILURE);
export const updateCurrentGroup = createAction(types.UPDATE_CURRENT_GROUP);
export const updateCurrentPage = createAction(types.UPDATE_CURRENT_PAGE);
export const showLoader = createAction(types.SHOW_LOADER);
export const hideLoader = createAction(types.HIDE_LOADER);

export const fetchWords = (currentGroup = DefaultValues.Group, currentPage = DefaultValues.Page) => async (
	dispatch
) => {
	try {
		dispatch(showLoader());
		dispatch(updateCurrentGroup(currentGroup));
		const response = await axios(ExternalUrls.Words, { params: { group: currentGroup, page: currentPage } });
		const words = response.data;
		dispatch(fetchWordsSuccess(words));
		dispatch(hideLoader());
	} catch (error) {
		dispatch(fetchWordsFailure(error));
	}
};
