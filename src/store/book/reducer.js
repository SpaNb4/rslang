import { createReducer } from '@reduxjs/toolkit';
import * as actions from './actions';
import { DefaultValues } from '../../common/constants';

const initialState = {
	words: [],
	aggregatedWords: [],
	currentGroup: DefaultValues.Group,
	currentPage: DefaultValues.Page,
	loading: false,
	errorMessage: '',
	isTranslationOn: true,
	isEditDictionaryButtons: true,
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
		.addCase(actions.updateIsTranslationOn, (state, action) => {
			state.isTranslationOn = action.payload;
		})
		.addCase(actions.updateIsEditDictionaryButtons, (state, action) => {
			state.isEditDictionaryButtons = action.payload;
		})
		.addDefaultCase((state) => state);
});

export default reducer;
