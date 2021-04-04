import { createReducer } from '@reduxjs/toolkit';
import * as actions from './actions';
import * as _ from 'lodash';

const initialState = {
	learnedWords: 0,
	statistics: [],
	error: '',
};

const reducer = createReducer(initialState, (builder) => {
	builder
		.addCase(actions.getStatisticsSuccess, (state, action) => {
			state.statistics = action.payload.statistics;
			state.learnedWords = _.reduce(
				action.payload.statistics,
				function (sum, item) {
					return sum + item.learnedWords;
				},
				0
			);
		})
		.addCase(actions.getStatisticsFailure, (state, action) => {
			state.error = action.payload;
		})
		.addCase(actions.updateStatisticsSuccess, (state, action) => {
			state.statistics = action.payload.statistics;
			state.learnedWords = _.reduce(
				action.payload.statistics,
				function (sum, item) {
					return sum + item.learnedWords;
				},
				0
			);
		})
		.addDefaultCase((state) => state);
});

export default reducer;
