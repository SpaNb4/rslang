import * as types from './action-types';
import { createAction } from '@reduxjs/toolkit';
import { LocalStorageKeys as l } from '../../common/constants';

export const setWords = createAction(types.WORDS);
export const fetchKeys = createAction(types.KEYS);
export const changeAnswer = createAction(types.ANSWERS);
export const submitForm = createAction(types.SUBMITTED);
export const fetchAttempts = createAction(types.ATTEMPTS);
export const reset = createAction(types.RESET);

export const submit = (attempts) => (dispatch) => {
	dispatch(submitForm());
	dispatch(fetchAttempts(attempts));
	localStorage.setItem(l.QuizAttempts, attempts);
};
