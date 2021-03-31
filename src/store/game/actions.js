import * as types from './action-types';
import { createAction } from '@reduxjs/toolkit';

export const loadGame = createAction(types.LOAD_GAME);
export const startGame = createAction(types.START_GAME);
export const finishGame = createAction(types.FINISH_GAME);
