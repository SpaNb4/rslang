import { createReducer } from '@reduxjs/toolkit';
import * as actions from './actions';

const initialState = {
	randomWords: [],
	currentWord: '',
	currentWordIndex: 0,
	currentCharIndex: 0,
	focusedIndex: 0,
	answers: [],
};

const reducer = createReducer(initialState, (builder) => {
	builder
		.addCase(actions.setRandomWords, (state, action) => {
			state.randomWords = action.payload;
		})
		.addCase(actions.setCurrentWord, (state, action) => {
			state.currentWord = action.payload;
			state.focusedIndex = 0;
		})
		.addCase(actions.increaseFocusedIndex, (state) => {
			if (state.focusedIndex < state.currentWord.length) {
				state.focusedIndex = state.focusedIndex + 1;
			}
		})
		.addCase(actions.reduceFocusedIndex, (state) => {
			if (state.focusedIndex >= 1) {
				state.focusedIndex = state.focusedIndex - 1;
			}
		})
		.addCase(actions.increaseCharIndex, (state) => {
			state.currentCharIndex = state.currentCharIndex + 1;
		})
		.addCase(actions.addAnswer, (state, action) => {
			state.answers = [...state.answers, action.payload];
			state.currentWordIndex = state.currentWordIndex + 1;
			state.currentCharIndex = 0;
		})
		.addDefaultCase((state) => state);
});

export default reducer;
