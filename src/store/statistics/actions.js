import * as types from './action-types';
import axios from 'axios';
import * as _ from 'lodash';
import { createAction } from '@reduxjs/toolkit';
import { ExternalUrls } from '../../common/constants';
import { logout } from '../app/actions';
import { checkIsTokenExpired } from '../../common/service';
import { buildUrl } from '../../common/helpers';

export const getStatisticsSuccess = createAction(types.UPDATE_STATISTICS_SUCCESS);
export const getStatisticsFailure = createAction(types.UPDATE_STATISTICS_FAILURE);
export const updateStatisticsSuccess = createAction(types.UPDATE_DAILY_STATISTICS_SUCCESS);

export const fetchUserStatistics = (userId, token) => async (dispatch) => {
	const isTokenExpired = checkIsTokenExpired();
	if (!isTokenExpired) {
		try {
			const { data } = await axios({
				method: 'get',
				url: buildUrl(ExternalUrls.Users, '/', userId, '/statistics'),
				withCredentials: true,
				headers: {
					Authorization: `Bearer ${token}`,
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			});
			dispatch(getStatisticsSuccess(data));
			const date = new Date().toISOString().slice(0, 10);
			if (!data.statistics || !_.find(data.statistics, { date: date })) {
				dispatch(updateStatistics(userId, token));
			}
		} catch (error) {
			dispatch(getStatisticsFailure(error.message));
		}
	} else {
		dispatch(logout());
	}
};

export const updateStatistics = (userId, token, statistics = { learnedWords: 0 }) => async (dispatch) => {
	const isTokenExpired = checkIsTokenExpired();
	if (!isTokenExpired) {
		const date = new Date().toISOString().slice(0, 10);
		statistics = { ...statistics, day: date };
		try {
			const { data } = await axios({
				method: 'put',
				url: buildUrl(ExternalUrls.Users, '/', userId, '/statistics'),
				withCredentials: true,
				headers: {
					Authorization: `Bearer ${token}`,
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				data: {
					optional: statistics,
				},
			});
			dispatch(updateStatisticsSuccess(data));
		} catch (error) {
			dispatch(getStatisticsFailure(error.message));
		}
	} else {
		dispatch(logout());
	}
};
