import { createReducer } from '@reduxjs/toolkit';
import * as actions from './actions';

const initialState = {
	keys: [],
	answers: {
		0: '',
		1: '',
		2: '',
	},
	submitted: false,
};

const reducer = createReducer(initialState, (builder) => {
	builder
		.addCase(actions.fetchKeys, (state, action) => {
			state.keys = action.payload;
		})
		.addCase(actions.changeAnswer, (state, action) => {
			state.answers = { ...state.answers, ...action.payload };
		})
		.addCase(actions.submit, (state) => {
			state.submitted = true;
		})
		.addDefaultCase((state) => state);
});

export default reducer;
