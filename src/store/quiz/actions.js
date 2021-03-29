import * as types from './action-types';
import { createAction } from '@reduxjs/toolkit';

export const fetchKeys = createAction(types.KEYS);
export const changeAnswer = createAction(types.ANSWERS);
export const submit = createAction(types.SUBMITTED);
