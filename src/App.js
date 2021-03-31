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
import Quiz from './components/Quiz/Quiz';

import { getUserId, getToken, getAuthorized } from './store/app/slices';
import { saveUserAuthData } from './store/app/actions';
import { fetchUserWords } from './store/dictionary/actions';
import {
	fetchWords,
	updateRemovedPages,
	updateRemovedWordsCount,
	updateIsEditDictionaryButtons,
} from './store/book/actions';
import { globalClasses as c, LocalStorageKeys } from './common/constants';
import { getUserDataFromLocalStorage } from './common/service';

function App() {
	const dispatch = useDispatch();
	const userId = useSelector(getUserId);
	const token = useSelector(getToken);
	const authorized = useSelector(getAuthorized);

	useEffect(() => {
		if (!authorized) {
			const userAuth = localStorage.getItem(LocalStorageKeys.User) || null;
			const tokenExpireTime = localStorage.getItem(LocalStorageKeys.TokenExpireTime) || null;
			if (userAuth && tokenExpireTime) {
				const userAuthData = JSON.parse(userAuth);
				const isTokenExpired = Date.now() > JSON.parse(tokenExpireTime);
				if (!isTokenExpired) {
					dispatch(saveUserAuthData(userAuthData));
				}
			}
		}
		if (authorized) {
			dispatch(fetchUserWords(userId, token));
			const removedPages = getUserDataFromLocalStorage(LocalStorageKeys.RemovedPages, userId);
			dispatch(updateRemovedPages(removedPages));
			const removedWordsCount = getUserDataFromLocalStorage(LocalStorageKeys.RemovedWordsCount, userId);
			dispatch(updateRemovedWordsCount(removedWordsCount));
			dispatch(updateIsEditDictionaryButtons(true));
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
					<Route path="/quiz" component={Quiz} />
				</Switch>
			</main>
			<Footer />
		</React.Fragment>
	);
}

export default App;
