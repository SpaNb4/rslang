import { SLICE_NAME } from './action-types';

const getSlice = (store) => store[SLICE_NAME];
export const getAllWords = (store) => getSlice(store).words;
export const getWordsLoading = (store) => getSlice(store).loading;
export const getCurrentGroup = (store) => getSlice(store).currentGroup;
export const getCurrentPage = (store) => getSlice(store).currentPage;
export const getAggregatedWords = (store) => getSlice(store).aggregatedWords;
export const getGameWords = (store) => getSlice(store).gameWords;
export const getIsTranslationOn = (store) => getSlice(store).isTranslationOn;
export const getIsEditDictionaryButtons = (store) => getSlice(store).isEditDictionaryButtons;
export const getRemovedPagesForGroup = (store) => getSlice(store).removedPages[getCurrentGroup(store)];
export const getRemovedWordsCountForGroup = (store) => getSlice(store).removedWordsCount[getCurrentGroup(store)];
