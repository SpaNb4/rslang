import { SLICE_NAME } from './action-types';

const getSlice = (store) => store[SLICE_NAME];
export const getUserWords = (store) => getSlice(store).userWords;
export const getUserWordsLoading = (store) => getSlice(store).loading;
