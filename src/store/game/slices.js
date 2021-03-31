import { SLICE_NAME } from './action-types';

const getSlice = (store) => store[SLICE_NAME];
export const getGameStart = (store) => getSlice(store).start;
export const getGameOver = (store) => getSlice(store).over;
export const getCurrentLevel = (store) => getSlice(store).level;
export const getAnswers = (store) => getSlice(store).answers;
export const getLongestStreak = (store) => getSlice(store).streak;
