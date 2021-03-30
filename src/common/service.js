import { LocalStorageKeys } from './constants';

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
				removedPages = {
					...removedPages,
					userId: { ...removedPages[userId], [group]: [...removedPages[userId][group], page] },
				};
			} else {
				removedPages = { ...removedPages, userId: { ...removedPages[userId], [group]: [page] } };
			}
		} else {
			removedPages = { ...removedPages, userId: { [group]: [page] } };
		}
	} else {
		removedPages = { userId: { [group]: [page] } };
	}
	localStorage.setItem(LocalStorageKeys.RemovedPages, JSON.stringify(removedPages));
}

export function getRemovedPagesFromLocalStorage(userId) {
	let data = localStorage.getItem(LocalStorageKeys.RemovedPages) || null;
	let removedPages;
	if (data) {
		removedPages = JSON.parse(data);
		if (removedPages[userId]) {
			removedPages = removedPages[userId];
		} else {
			removedPages = {};
		}
	} else {
		removedPages = {};
	}
	return removedPages;
}
