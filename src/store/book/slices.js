import { SLICE_NAME } from './action-types';

const getSlice = (store) => store[SLICE_NAME];
export const getAllWords = (store) => getSlice(store).words;
export const getWordsLoading = (store) => getSlice(store).loading;
export const getCurrentGroup = (store) => getSlice(store).currentGroup;
export const getCurrentPage = (store) => getSlice(store).currentPage;
