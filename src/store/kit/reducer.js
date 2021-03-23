import { createReducer } from '@reduxjs/toolkit';
import * as actions from './actions';

const initialState = {
	randomWords: [],
	currentWord: '',
	currentWordIndex: 0,
	currentCharIndex: 0,
};

const reducer = createReducer(initialState, (builder) => {
	builder
		.addCase(actions.setRandomWords, (state, action) => {
			state.randomWords = action.payload;
		})
		.addCase(actions.setCurrentWord, (state, action) => {
			state.currentWord = action.payload;
		})
		.addCase(actions.increaseWordIndex, (state) => {
			state.currentWordIndex = state.currentWordIndex + 1;
			state.currentCharIndex = 0;
		})
		.addCase(actions.increaseCharIndex, (state) => {
			state.currentCharIndex = state.currentCharIndex + 1;
		})
		.addDefaultCase((state) => state);
});

export default reducer;
