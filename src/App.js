import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Features from './components/Features/Features';
import Team from './components/Team/Team';
import Video from './components/Video/Video';
import { globalClasses as c } from './common/constants';
import Book from './components/Book/Book';

import { LocalStorageKeys } from './common/constants';
import { login, register } from './store/app/actions';
import { getUserId, getToken, getAuthorized } from './store/app/slices';
import { fetchUserWords } from './store/dictionary/actions';
import { fetchWords } from './store/book/actions';

function App() {
	const dispatch = useDispatch();
	const userId = useSelector(getUserId);
	const token = useSelector(getToken);
	const authorized = useSelector(getAuthorized);

	useEffect(() => {
		if (!authorized) {
			const user = localStorage.getItem(LocalStorageKeys.User) || null;
			if (user) {
				const userData = JSON.parse(user);
				dispatch(login(userData.email, userData.password));
			} else {
				const user = {
					name: 'imisha',
					email: 'imisha@gmail.com',
					password: 'imisha15',
				};
				localStorage.setItem(LocalStorageKeys.User, JSON.stringify(user));
				dispatch(register(user.name, user.email, user.password));
			}
		}
		if (authorized) {
			console.log('get user words');
			dispatch(fetchUserWords(userId, token));
		} else {
			console.log('get all words');
			dispatch(fetchWords());
		}
	}, [userId, token, authorized]);

	return (
		<React.Fragment>
			<Header />
			<main className={c.container}>
				<Switch>
					<Route exact path="/">
						<div>
							<Features />
							<Video />
							<Team />
						</div>
					</Route>
					<Route path="/book/:group" component={Book} />
				</Switch>
			</main>
		</React.Fragment>
	);
}

export default App;
