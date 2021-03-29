import { SLICE_NAME } from './action-types';

const getSlice = (store) => store[SLICE_NAME];
export const getAnswers = (store) => getSlice(store).answers;
export const getKeys = (store) => getSlice(store).keys;
export const getSubmitted = (store) => getSlice(store).submitted;
