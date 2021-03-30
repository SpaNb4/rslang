import * as types from './action-types';
import { createAction } from '@reduxjs/toolkit';

export const setWords = createAction(types.WORDS);
export const fetchKeys = createAction(types.KEYS);
export const changeAnswer = createAction(types.ANSWERS);
export const submit = createAction(types.SUBMITTED);
export const reset = createAction(types.RESET);
