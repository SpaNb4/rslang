import { createReducer } from '@reduxjs/toolkit';
import * as actions from './actions';

const initialState = {
	userWords: [],
	loading: false,
	errorMessage: '',
};

const reducer = createReducer(initialState, (builder) => {
	builder
		.addCase(actions.fetchUserWordsSuccess, (state, action) => {
			state.userWords = action.payload;
		})
		.addCase(actions.createUserWordSuccess, (state, { payload }) => {
			state.userWords = [...state.userWords, payload];
		})
		.addCase(actions.fetchUserWordsFailure, (state, action) => {
			state.errorMessage = action.payload;
		})
		.addCase(actions.createUserWordFailure, (state, action) => {
			state.errorMessage = action.payload;
		})
		.addCase(actions.deleteUserWordSuccess, (state, { payload }) => {
			state.userWords = state.userWords.filter((word) => word.wordId !== payload);
		})
		.addCase(actions.deleteUserWordFailure, (state, action) => {
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
