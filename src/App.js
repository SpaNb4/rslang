import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Features from './components/Features/Features';
import Team from './components/Team/Team';
import Video from './components/Video/Video';
import Footer from './components/Footer/Footer';
import Book from './components/Book/Book';
import Vocabulary from './components/Vocabulary/Vocabulary';

import { getUserId, getToken, getAuthorized } from './store/app/slices';
import { saveUserAuthData, refreshToken } from './store/app/actions';
import { fetchUserWords } from './store/dictionary/actions';
import { fetchWords } from './store/book/actions';
import { globalClasses as c, LocalStorageKeys } from './common/constants';

function App() {
	const dispatch = useDispatch();
	const userId = useSelector(getUserId);
	const token = useSelector(getToken);
	const authorized = useSelector(getAuthorized);

	useEffect(() => {
		if (!authorized) {
			const userAuth = localStorage.getItem(LocalStorageKeys.User) || null;
			const tokenExpireTime = localStorage.getItem(LocalStorageKeys.TokenExpireTime) || null;
			const refreshTokenExpireTime = localStorage.getItem(LocalStorageKeys.RefreshTokenExpireTime) || null;

			if (userAuth && tokenExpireTime && refreshTokenExpireTime) {
				const userAuthData = JSON.parse(userAuth);

				const isTokenExpired = Date.now() > JSON.parse(tokenExpireTime);
				if (!isTokenExpired) {
					dispatch(saveUserAuthData(userAuthData));
				}

				const isRefreshTokenExpired = Date.now() < JSON.parse(refreshTokenExpireTime);
				if (isTokenExpired && !isRefreshTokenExpired) {
					dispatch(refreshToken(userAuthData.userId, userAuthData.refreshToken));
				}
			}
		}
		if (authorized) {
			dispatch(fetchUserWords(userId, token));
		} else {
			dispatch(fetchWords());
		}
	}, [userId, token, authorized]);

	return (
		<React.Fragment>
			<Header />
			<main className={c.container}>
				<Switch>
					<Route exact path="/">
						<Features />
						<Video />
						<Team />
					</Route>
					<Route path="/book/:group" component={Book} />
					<Route path="/vocabulary/:group" component={Vocabulary} />
				</Switch>
			</main>
			<Footer />
		</React.Fragment>
	);
}

export default App;
