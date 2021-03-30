import * as types from './action-types';
import { createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ExternalUrls, DefaultValues } from '../../common/constants';
import { buildUrl } from '../../common/helpers';
import { checkIsTokenExpired } from '../../common/service';
import { logout } from '../app/actions';

export const fetchWordsSuccess = createAction(types.FETCH_WORDS_SUCCESS);
export const fetchWordsFailure = createAction(types.FETCH_WORDS_FAILURE);
export const updateCurrentGroup = createAction(types.UPDATE_CURRENT_GROUP);
export const updateCurrentPage = createAction(types.UPDATE_CURRENT_PAGE);
export const showLoader = createAction(types.SHOW_LOADER);
export const hideLoader = createAction(types.HIDE_LOADER);
export const fetchAggregatedWordsSuccess = createAction(types.FETCH_AGGREGATED_WORDS_SUCCESS);
export const fetchAggregatedWordsFailure = createAction(types.FETCH_AGGREGATED_WORDS_FAILURE);
export const updateIsTranslationOn = createAction(types.UPDATE_IS_TRANSLATION_ON);
export const updateIsEditDictionaryButtons = createAction(types.UPDATE_IS_EDIT_DICTIONARY_BUTTONS);
export const updateRemovedPagesForGroup = createAction(types.UPDATE_REMOVED_PAGES_FOR_GROUP);

export const fetchWords = (currentGroup = DefaultValues.Group, currentPage = DefaultValues.Page) => async (
	dispatch
) => {
	try {
		dispatch(showLoader());
		const response = await axios(ExternalUrls.Words, { params: { group: currentGroup, page: currentPage } });
		const words = response.data;
		dispatch(fetchWordsSuccess(words));
		dispatch(hideLoader());
	} catch (error) {
		dispatch(fetchWordsFailure(error));
	}
};

export const fetchAggregatedWords = (currentGroup, currentPage, userId, token, filterObj) => async (dispatch) => {
	const isTokenExpired = checkIsTokenExpired();
	if (!isTokenExpired) {
		try {
			dispatch(showLoader());
			const response = await axios({
				method: 'get',
				url: buildUrl(ExternalUrls.Users, '/', userId, '/aggregatedWords'),
				params: {
					group: currentGroup,
					page: currentPage,
					wordsPerPage: DefaultValues.WordsPerPage,
					filter: filterObj,
				},
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const words = response.data[0].paginatedResults;
			dispatch(fetchAggregatedWordsSuccess(words));
			dispatch(hideLoader());
		} catch (error) {
			dispatch(fetchAggregatedWordsFailure(error));
		}
	} else {
		dispatch(logout());
	}
};
