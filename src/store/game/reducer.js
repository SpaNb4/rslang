import { createReducer } from '@reduxjs/toolkit';
import * as actions from './actions';
import { DefaultValues } from '../../common/constants';

const initialState = {
	name: '',
	settings: false,
	start: false,
	over: false,
	answers: {
		correct: [],
		wrong: [],
	},
	streak: 0,
	level: DefaultValues.Group,
};

const reducer = createReducer(initialState, (builder) => {
	builder
		.addCase(actions.loadGame, () => initialState)
		.addCase(actions.startGame, (state, action) => {
			state.start = true;
			state.level = action.payload;
		})
		.addCase(actions.finishGame, (state, action) => {
			state.answers = action.payload;
			state.start = false;
			state.over = true;
		})
		.addDefaultCase((state) => state);
});

export default reducer;
