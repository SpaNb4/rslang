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
