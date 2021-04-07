import { createReducer } from '@reduxjs/toolkit';
import * as actions from './actions';

const initialState = {
	name: '',
	settings: false,
	start: false,
	over: false,
	answers: {
		correct: [],
		wrong: [],
		streak: 0,
	},

	level: null,
	volume: true,
};

const reducer = createReducer(initialState, (builder) => {
	builder
		.addCase(actions.resetGame, (state) => {
			state.name = '';
			state.settings = false;
			state.start = false;
			state.over = false;
			state.answers = {
				correct: [],
				wrong: [],
				streak: 0,
			};
			state.level = null;
		})
		.addCase(actions.fetchName, (state, action) => {
			state.name = action.payload;
		})
		.addCase(actions.startGame, (state) => {
			state.start = true;
		})
		.addCase(actions.setLevel, (state, action) => {
			state.level = action.payload;
		})
		.addCase(actions.finishGame, (state, action) => {
			state.answers = action.payload;
			state.start = false;
			state.over = true;
		})
		.addCase(actions.changeVolume, (state, action) => {
			state.volume = action.payload;
		})
		.addDefaultCase((state) => state);
});

export default reducer;
