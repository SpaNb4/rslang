import * as types from './action-types';
import axios from 'axios';
import { createAction } from '@reduxjs/toolkit';
import { ExternalUrls } from '../../common/constants';
import { logout } from '../app/actions';
import { checkIsTokenExpired } from '../../common/service';
import { buildUrl } from '../../common/helpers';

export const getStatisticsSuccess = createAction(types.UPDATE_STATISTICS_SUCCESS);
export const getStatisticsFailure = createAction(types.UPDATE_STATISTICS_FAILURE);
export const updateDailyStatisticsSuccess = createAction(types.UPDATE_DAILY_STATISTICS_SUCCESS);

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
		} catch (error) {
			dispatch(getStatisticsFailure(error.message));
		}
	} else {
		dispatch(logout());
	}
};

export const updateDailyStatistics = (userId, token) => async (dispatch) => {
	const isTokenExpired = checkIsTokenExpired();
	if (!isTokenExpired) {
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
			});
			console.log(data);
			dispatch(updateDailyStatisticsSuccess(data));
		} catch (error) {
			dispatch(getStatisticsFailure(error.message));
		}
	} else {
		dispatch(logout());
	}
};
