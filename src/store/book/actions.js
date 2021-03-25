import * as types from './action-types';
import { createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ExternalUrls, DefaultValues } from '../../common/constants';
import { buildUrl } from '../../common/helpers';

export const fetchWordsSuccess = createAction(types.FETCH_WORDS_SUCCESS);
export const fetchWordsFailure = createAction(types.FETCH_WORDS_FAILURE);
export const updateCurrentGroup = createAction(types.UPDATE_CURRENT_GROUP);
export const updateCurrentPage = createAction(types.UPDATE_CURRENT_PAGE);
export const showLoader = createAction(types.SHOW_LOADER);
export const hideLoader = createAction(types.HIDE_LOADER);
export const fetchAggregatedWordsSuccess = createAction(types.FETCH_AGGREGATED_WORDS_SUCCESS);
export const fetchAggregatedWordsFailure = createAction(types.FETCH_AGGREGATED_WORDS_FAILURE);

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

export const fetchAggregatedWords = (group, page, userId, token, filterObj) => async (dispatch) => {
	try {
		dispatch(showLoader());
		const response = await axios({
			method: 'get',
			url: buildUrl(ExternalUrls.Users, '/', userId, '/aggregatedWords'),
			params: {
				group: group,
				page: page,
				wordsPerPage: '20',
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
};
