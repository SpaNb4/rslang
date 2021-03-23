import { SLICE_NAME } from './action-types';

import { DictionarySections } from '../../common/constants';

const getSlice = (store) => store[SLICE_NAME];
export const getUserWords = (store) => getSlice(store).userWords;
export const getUserWordsLoading = (store) => getSlice(store).loading;
export const getHardWords = (store) =>
	getUserWords(store).filter((word) => word.difficulty === DictionarySections.Hard);
export const getRemovedWords = (store) =>
	getUserWords(store).filter((word) => word.difficulty === DictionarySections.Removed);
export const getTrainedWords = (store) =>
	getUserWords(store).filter((word) => word.difficulty === DictionarySections.Trained);
