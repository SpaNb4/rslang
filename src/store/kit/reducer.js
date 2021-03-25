import { createReducer } from '@reduxjs/toolkit';
import * as actions from './actions';

const initialState = {
	randomWords: [],
	currentWord: '',
	currentWordIndex: 0,
	currentCharIndex: 0,
	answers: [],
};

const reducer = createReducer(initialState, (builder) => {
	builder
		.addCase(actions.setRandomWords, (state, action) => {
			state.randomWords = action.payload;
		})
		.addCase(actions.setCurrentWord, (state, action) => {
			state.currentWord = action.payload;
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
