import { createReducer } from '@reduxjs/toolkit';
import * as actions from './actions';
import { DefaultValues } from '../../common/constants';
import * as _ from 'lodash';

const initialState = {
	words: [],
	aggregatedWords: [],
	gameWords: [],
	currentGroup: DefaultValues.Group,
	currentPage: DefaultValues.Page,
	loading: false,
	errorMessage: '',
	isTranslationOn: true,
	isEditDictionaryButtons: false,
	removedPages: {},
	removedWordsCount: {},
};

const reducer = createReducer(initialState, (builder) => {
	builder
		.addCase(actions.fetchWordsSuccess, (state, action) => {
			state.words = action.payload;
		})
		.addCase(actions.fetchWordsFailure, (state, action) => {
			state.errorMessage = action.payload;
		})
		.addCase(actions.updateCurrentGroup, (state, action) => {
			state.currentGroup = action.payload;
		})
		.addCase(actions.updateCurrentPage, (state, action) => {
			state.currentPage = action.payload;
		})
		.addCase(actions.fetchAggregatedWordsSuccess, (state, action) => {
			state.aggregatedWords = action.payload;
		})
		.addCase(actions.fetchAggregatedWordsFailure, (state, action) => {
			state.errorMessage = action.payload;
		})
		.addCase(actions.fetchGameWordsSuccess, (state, action) => {
			state.gameWords = action.payload;
		})
		.addCase(actions.fetchGameWordsFailure, (state, action) => {
			state.errorMessage = action.payload;
		})
		.addCase(actions.showLoader, (state) => {
			state.loading = true;
		})
		.addCase(actions.hideLoader, (state) => {
			state.loading = false;
		})
		.addCase(actions.updateIsTranslationOn, (state, action) => {
			state.isTranslationOn = action.payload;
		})
		.addCase(actions.updateIsEditDictionaryButtons, (state, action) => {
			state.isEditDictionaryButtons = action.payload;
		})
		.addCase(actions.updateRemovedPagesForGroup, (state, { payload: { group, page, action } }) => {
			if (action === 'remove') {
				if (state.removedPages[group]) {
					if (!state.removedPages[group].includes(page)) {
						state.removedPages = {
							...state.removedPages,
							[group]: _.sortBy([...state.removedPages[group], page]),
						};
					}
				} else {
					state.removedPages = { ...state.removedPages, [group]: [page] };
				}
			}
			if (action === 'restore') {
				const pages = [...state.removedPages[group]];
				const pageIndex = pages.indexOf(page);
				if (pageIndex !== -1) {
					pages.splice(pageIndex, 1);
					state.removedPages = {
						...state.removedPages,
						[group]: [...pages],
					};
				}
			}
		})
		.addCase(actions.updateRemovedWordsCountForPage, (state, { payload: { group, page, action } }) => {
			if (action === 'increment') {
				if (state.removedWordsCount[group]) {
					if (state.removedWordsCount[group][page]) {
						state.removedWordsCount = {
							...state.removedWordsCount,
							[group]: {
								...state.removedWordsCount[group],
								[page]: state.removedWordsCount[group][page] + 1,
							},
						};
					} else {
						state.removedWordsCount = {
							...state.removedWordsCount,
							[group]: { ...state.removedWordsCount[group], [page]: 1 },
						};
					}
				} else {
					state.removedWordsCount = { ...state.removedWordsCount, [group]: { [page]: 1 } };
				}
			}
			if (action === 'decrement') {
				if (state.removedWordsCount[group]) {
					if (state.removedWordsCount[group][page] > 0) {
						state.removedWordsCount = {
							...state.removedWordsCount,
							[group]: {
								...state.removedWordsCount[group],
								[page]: state.removedWordsCount[group][page] - 1,
							},
						};
					}
				}
			}
		})
		.addCase(actions.updateRemovedPages, (state, action) => {
			state.removedPages = action.payload;
		})
		.addCase(actions.updateRemovedWordsCount, (state, action) => {
			state.removedWordsCount = action.payload;
		})
		.addCase(actions.clearAggregatedWords, (state) => {
			state.aggregatedWords = [];
		})
		.addDefaultCase((state) => state);
});

export default reducer;
