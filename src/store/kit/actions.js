import * as types from './action-types';
import { createAction } from '@reduxjs/toolkit';

export const setRandomWords = createAction(types.RANDOM_WORDS);
export const setCurrentWord = createAction(types.CURRENT_WORD);
export const increaseCharIndex = createAction(types.CHAR_INCREMENT);
export const addAnswer = createAction(types.ADD_ANSWER);