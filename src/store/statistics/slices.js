import { SLICE_NAME } from './action-types';

const getSlice = (store) => store[SLICE_NAME];
export const getStatistics = (store) => getSlice(store).statistics;
export const getLearnedWords = (store) => getSlice(store).learnedWords;
