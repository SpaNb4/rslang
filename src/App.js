import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Features from './components/Features/Features';
import Team from './components/Team/Team';
import Video from './components/Video/Video';
import Footer from './components/Footer/Footer';
import Book from './components/Book/Book';

import { login, register } from './store/app/actions';
import { getUserId, getToken } from './store/app/slices';
import { fetchUserWords } from './store/dictionary/actions';
import { globalClasses as c, LocalStorageKeys } from './common/constants';

function App() {
	const dispatch = useDispatch();
	const userId = useSelector(getUserId);
	const token = useSelector(getToken);

	useEffect(() => {
		const user = localStorage.getItem(LocalStorageKeys.User) || null;
		if (user) {
			const userData = JSON.parse(user);
			dispatch(login(userData.email, userData.password));
		} else {
			const user = {
				name: 'usermane',
				email: 'email@gmail.com',
				password: 'password',
			};
			localStorage.setItem(LocalStorageKeys.User, JSON.stringify(user));
			dispatch(register(user.name, user.email, user.password));
		}
	}, []);

	useEffect(() => {
		if (userId && token) {
			dispatch(fetchUserWords(userId, token));
		}
	}, [userId, token]);

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
