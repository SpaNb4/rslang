import { createReducer } from '@reduxjs/toolkit';
import * as actions from './actions';

const initialState = {
	learnedWords: 0,
	dailyStatistics: {},
	error: '',
};

const reducer = createReducer(initialState, (builder) => {
	builder
		.addCase(actions.getStatisticsSuccess, (state, action) => {
			state.learnedWords = action.payload.learnedWords;
			state.dailyStatistics = action.payload.dailyStatistics;
		})
		.addCase(actions.getStatisticsFailure, (state, action) => {
			state.error = action.payload;
		})
		.addCase(actions.updateDailyStatisticsSuccess, (state, action) => {
			state.dailyStatistics = action.payload;
		})
		.addDefaultCase((state) => state);
});

export default reducer;
