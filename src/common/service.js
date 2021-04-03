import { LocalStorageKeys } from './constants';
import * as _ from 'lodash';

export function checkIsTokenExpired() {
	let isTokenExpired;
	const tokenExpireTime = localStorage.getItem(LocalStorageKeys.TokenExpireTime) || null;
	if (tokenExpireTime) {
		isTokenExpired = Date.now() > JSON.parse(tokenExpireTime);
		return isTokenExpired;
	} else {
		isTokenExpired = true;
	}
}

export function saveRemovedPagesToLocalStorage(userId, group, page) {
	let data = localStorage.getItem(LocalStorageKeys.RemovedPages) || null;
	let removedPages;
	if (data) {
		removedPages = JSON.parse(data);
		if (removedPages[userId]) {
			if (removedPages[userId][group]) {
				if (!removedPages[userId][group].includes(page)) {
					removedPages = {
						...removedPages,
						[userId]: {
							...removedPages[userId],
							[group]: _.sortBy([...removedPages[userId][group], page]),
						},
					};
				}
			} else {
				removedPages = { ...removedPages, [userId]: { ...removedPages[userId], [group]: [page] } };
			}
		} else {
			removedPages = { ...removedPages, [userId]: { [group]: [page] } };
		}
	} else {
		removedPages = { [userId]: { [group]: [page] } };
	}
	localStorage.setItem(LocalStorageKeys.RemovedPages, JSON.stringify(removedPages));
}

export function saveRemovedWordsCountToLocalStorage(userId, group, page) {
	let data = JSON.parse(localStorage.getItem(LocalStorageKeys.RemovedWordsCount) || null);
	let removedWordsCount;
	if (data) {
		removedWordsCount = data;
		if (removedWordsCount[userId]) {
			if (removedWordsCount[userId][group]) {
				if (removedWordsCount[userId][group][page]) {
					removedWordsCount = {
						...removedWordsCount,
						[userId]: {
							...removedWordsCount[userId],
							[group]: {
								...removedWordsCount[userId][group],
								[page]: removedWordsCount[userId][group][page] + 1,
							},
						},
					};
				} else {
					removedWordsCount = {
						...removedWordsCount,
						[userId]: {
							...removedWordsCount[userId],
							[group]: { ...removedWordsCount[userId][group], [page]: 1 },
						},
					};
				}
			} else {
				removedWordsCount = {
					...removedWordsCount,
					[userId]: { ...removedWordsCount[userId], [group]: { [page]: 1 } },
				};
			}
		} else {
			removedWordsCount = {
				...removedWordsCount,
				[userId]: { [group]: { [page]: 1 } },
			};
		}
	} else {
		removedWordsCount = { [userId]: { [group]: { [page]: 1 } } };
	}
	localStorage.setItem(LocalStorageKeys.RemovedWordsCount, JSON.stringify(removedWordsCount));
}

export function getUserDataFromLocalStorage(key, userId) {
	let data = JSON.parse(localStorage.getItem(key) || null);
	let userData = {};
	if (data && data[userId]) {
		userData = data[userId];
	}
	return userData;
}
