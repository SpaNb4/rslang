import { SLICE_NAME } from './action-types';

const getSlice = (store) => store[SLICE_NAME];
export const getRandomWords = (store) => getSlice(store).randomWords;
export const getCurrentWord = (store) => getSlice(store).currentWord;
export const getCurrWordIndex = (store) => getSlice(store).currentWordIndex;
export const getCurrCharIndex = (store) => getSlice(store).currentCharIndex;
export const getAnswers = (store) => getSlice(store).answers;
