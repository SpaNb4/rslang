import { createReducer } from '@reduxjs/toolkit';
import * as actions from './actions';

const initialState = {
	auth: false,
	user: null,
	errorMessage: '',
	userErrorMessage: '',
	menuHidden: true,
};

const reducer = createReducer(initialState, (builder) => {
	builder
		.addCase(actions.registerSuccess, (state, action) => {
			state.user = action.payload;
		})
		.addCase(actions.updateErrorMessage, (state, action) => {
			state.errorMessage = action.payload;
		})
		.addCase(actions.updateUserErrorMessage, (state, action) => {
			state.userErrorMessage = action.payload;
		})
		.addCase(actions.loginSuccess, (state, action) => {
			state.user = action.payload;
			state.auth = true;
		})
		.addCase(actions.clearErrorMessage, (state) => {
			state.userErrorMessage = '';
		})
		.addCase(actions.saveUserAuthData, (state, action) => {
			state.user = action.payload;
			state.auth = true;
		})
		.addCase(actions.logoutSuccess, (state) => {
			state.user = null;
			state.auth = false;
		})
		.addCase(actions.menuToggle, (state, action) => {
			state.menuHidden = action.payload;
		})
		.addDefaultCase((state) => state);
});

export default reducer;
