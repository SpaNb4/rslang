import { createReducer } from '@reduxjs/toolkit';
import * as actions from './actions';

const initialState = {
	words: [],
	aggregatedWords: [],
	currentGroup: '',
	currentPage: '',
	loading: false,
	errorMessage: '',
};

const reducer = createReducer(initialState, (builder) => {
	builder
		.addCase(actions.fetchWordsSuccess, (state, action) => {
			state.words = action.payload;
		})
		.addCase(actions.fetchWordsFailure, (state, action) => {
			state.errorMessage = action.payload;
		})
		.addCase(actions.updateCurrentGroup, (state, action) => {
			state.currentGroup = action.payload;
		})
		.addCase(actions.updateCurrentPage, (state, action) => {
			state.currentPage = action.payload;
		})
		.addCase(actions.fetchAggregatedWordsSuccess, (state, action) => {
			state.aggregatedWords = action.payload;
		})
		.addCase(actions.fetchAggregatedWordsFailure, (state, action) => {
			state.errorMessage = action.payload;
		})
		.addCase(actions.showLoader, (state) => {
			state.loading = true;
		})
		.addCase(actions.hideLoader, (state) => {
			state.loading = false;
		})
		.addDefaultCase((state) => state);
});

export default reducer;
