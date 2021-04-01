import * as types from './action-types';
import { createAction } from '@reduxjs/toolkit';

export const resetGame = createAction(types.RESET_GAME);
export const fetchName = createAction(types.FETCH_NAME);
export const startGame = createAction(types.START_GAME);
export const finishGame = createAction(types.FINISH_GAME);

export const updateGame = (name) => (dispatch) => {
	dispatch(resetGame());
	dispatch(fetchName(name));
};
