import * as types from './action-types';
import { createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ExternalUrls, DictionarySections } from '../../common/constants';
import { buildUrl } from '../../common/helpers';
import { checkIsTokenExpired, saveRemovedWordsCountToLocalStorage } from '../../common/service';
import { logout } from '../app/actions';
import { updateRemovedWordsCountForPage } from '../book/actions';
import { fetchAggregatedWords } from '../book/actions';
import { updateStatistics } from '../statistics/actions';

export const fetchUserWordsSuccess = createAction(types.FETCH_USER_WORDS_SUCCESS);
export const createUserWordSuccess = createAction(types.CREATE_USER_WORD_SUCCESS);
export const deleteUserWordSuccess = createAction(types.DELETE_USER_WORD_SUCCESS);
export const fetchUserWordsFailure = createAction(types.FETCH_USER_WORDS_FAILURE);
export const createUserWordFailure = createAction(types.CREATE_USER_WORD_FAILURE);
export const deleteUserWordFailure = createAction(types.DELETE_USER_WORD_FAILURE);
export const showLoader = createAction(types.SHOW_LOADER);
export const hideLoader = createAction(types.HIDE_LOADER);
export const clearUserWords = createAction(types.CLEAR_USER_WORDS);

export const fetchUserWords = (userId, token) => async (dispatch) => {
	const isTokenExpired = checkIsTokenExpired();
	if (!isTokenExpired) {
		try {
			dispatch(showLoader());
			const { data } = await axios({
				method: 'get',
				url: buildUrl(ExternalUrls.Users, '/', userId, '/words'),
				params: {
					id: userId,
				},
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			dispatch(fetchUserWordsSuccess(data));
			dispatch(hideLoader());
		} catch (error) {
			dispatch(fetchUserWordsFailure(error));
		}
	} else {
		dispatch(logout());
	}
};

export const setUserWord = (
	userId,
	token,
	wordData,
	section,
	game = null,
	correctAnswers = 0,
	wrongAnswers = 0
) => async (dispatch) => {
	const isTokenExpired = checkIsTokenExpired();
	if (!isTokenExpired) {
		const wordId = wordData.id || wordData._id;
		const date = new Date().toISOString().slice(0, 10);
		if (game) {
			wordData = {
				...wordData,
				[game]: {
					trained: true,
					correct: correctAnswers,
					wrong: wrongAnswers,
				},
			};
		}
		try {
			const { data } = await axios({
				method: 'post',
				url: buildUrl(ExternalUrls.Users, '/', userId, '/words/', wordId),
				withCredentials: true,
				data: {
					difficulty: section,
					optional: {
						...wordData,
						created_at: date,
					},
				},
				headers: {
					Authorization: `Bearer ${token}`,
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			});
			dispatch(createUserWordSuccess(data));
			if (section === DictionarySections.Removed) {
				const filterRules = JSON.stringify({
					$or: [
						{ 'userWord.difficulty': DictionarySections.Hard },
						{ 'userWord.difficulty': DictionarySections.Trained },
						{ userWord: null },
					],
				});
				dispatch(fetchAggregatedWords(wordData.group, wordData.page, userId, token, filterRules));
				dispatch(
					updateRemovedWordsCountForPage({
						group: +wordData.group,
						page: +wordData.page,
						action: 'increment',
					})
				);
				saveRemovedWordsCountToLocalStorage(userId, +wordData.group, +wordData.page, 'increment');
			} else {
				dispatch(updateStatistics(userId, token, { learnedWords: 1 }));
			}
		} catch (error) {
			dispatch(createUserWordFailure(error));
		}
	} else {
		dispatch(logout());
	}
};

export const updateUserWord = (
	userId,
	token,
	wordData,
	section,
	game = null,
	correctAnswers = 0,
	wrongAnswers = 0
) => async (dispatch) => {
	const isTokenExpired = checkIsTokenExpired();
	if (!isTokenExpired) {
		const wordId = wordData.id || wordData._id || wordData.optional._id;
		if (game) {
			if (wordData.optional) {
				correctAnswers = wordData.optional[game]
					? wordData.optional[game].correct + correctAnswers
					: correctAnswers;
				wrongAnswers = wordData.optional[game] ? wordData.optional[game].wrong + wrongAnswers : wrongAnswers;
			} else {
				correctAnswers = wordData[game] ? wordData[game].correct + correctAnswers : correctAnswers;
				wrongAnswers = wordData[game] ? wordData[game].wrong + wrongAnswers : wrongAnswers;
			}
			let gameData = {
				[game]: {
					trained: true,
					correct: correctAnswers,
					wrong: wrongAnswers,
				},
			};
			if (wordData.optional) {
				wordData = {
					...wordData.optional,
					...gameData,
				};
			} else {
				wordData = {
					...wordData,
					...gameData,
				};
			}
		}

		try {
			const { data } = await axios({
				method: 'put',
				url: buildUrl(ExternalUrls.Users, '/', userId, '/words/', wordId),
				data: {
					difficulty: section,
					optional: {
						...wordData,
					},
				},
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			dispatch(createUserWordSuccess(data));
			if (section === DictionarySections.Removed) {
				const filterRules = JSON.stringify({
					$or: [
						{ 'userWord.difficulty': DictionarySections.Hard },
						{ 'userWord.difficulty': DictionarySections.Trained },
						{ userWord: null },
					],
				});
				dispatch(fetchAggregatedWords(wordData.group, wordData.page, userId, token, filterRules));
				dispatch(
					updateRemovedWordsCountForPage({
						group: +wordData.group,
						page: +wordData.page,
						action: 'increment',
					})
				);
				saveRemovedWordsCountToLocalStorage(userId, +wordData.group, +wordData.page, 'increment');
			}
		} catch (error) {
			dispatch(createUserWordFailure(error));
		}
	} else {
		dispatch(logout());
	}
};

export const removeUserWord = (userId, token, wordData) => async (dispatch) => {
	const isTokenExpired = checkIsTokenExpired();
	const id = wordData._id || wordData.id;

	if (!isTokenExpired) {
		try {
			await axios({
				method: 'delete',
				url: buildUrl(ExternalUrls.Users, '/', userId, '/words/', id),
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			dispatch(deleteUserWordSuccess(id));
		} catch (error) {
			dispatch(deleteUserWordFailure(error));
		}
	} else {
		dispatch(logout());
	}
};
