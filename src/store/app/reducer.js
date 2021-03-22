import { createReducer } from '@reduxjs/toolkit';
import * as actions from './actions';

const initialState = {
	auth: false,
	user: null,
	errorMessage: null,
};

const reducer = createReducer(initialState, (builder) => {
	builder
		.addCase(actions.registerSuccess, (state, action) => {
			state.user = action.payload;
			state.auth = true;
		})
		.addCase(actions.registerFailure, (state, action) => {
			state.errorMessage = action.payload;
		})
		.addCase(actions.loginSuccess, (state, action) => {
			state.user = action.payload;
			state.auth = true;
		})
		.addCase(actions.logout, (state) => {
			state.user = null;
		})
		.addDefaultCase((state) => state);
});

export default reducer;
