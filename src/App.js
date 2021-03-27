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

import { login, register } from './store/app/actions';
import { getUserId, getToken, getAuthorized } from './store/app/slices';
import { fetchUserWords } from './store/dictionary/actions';
import { globalClasses as c, LocalStorageKeys } from './common/constants';
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
					name: 'SpaNb4',
					email: 'spanb4@gmail.com',
					password: '12345678',
				};
				localStorage.setItem(LocalStorageKeys.User, JSON.stringify(user));
				dispatch(register(user.name, user.email, user.password));
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
						<div>
							<Features />
							<Video />
							<Team />
						</div>
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
