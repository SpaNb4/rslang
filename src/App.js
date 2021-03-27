import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Features from './components/Features/Features';
import Team from './components/Team/Team';
import Video from './components/Video/Video';
import Footer from './components/Footer/Footer';
import Book from './components/Book/Book';

import { getUserId, getToken, getAuthorized } from './store/app/slices';
import { saveUserAuthData } from './store/app/actions';
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
			if (userAuth) {
				dispatch(saveUserAuthData(JSON.parse(userAuth)));
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
				</Switch>
			</main>
			<Footer />
		</React.Fragment>
	);
}

export default App;
