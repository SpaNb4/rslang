import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Features from './components/Features/Features';
import Team from './components/Team/Team';
import Video from './components/Video/Video';
import { globalClasses as c } from './common/constants';
import Book from './components/Book/Book';
<<<<<<< HEAD
=======
import { CONTAINER } from './common/constants';
// import { LocalStorageKeys } from './common/constants';

// import { loginSuccess } from './store/app/actions';
// import { register } from './store/app/actions';
import { login } from './store/app/actions';
>>>>>>> feat: save word to dictionary action

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		// const username = localStorage.getItem(LocalStorageKeys.Username) || null;

		// Just for dev purpose
		// const username = 'admin';
		const email = 'admin@gmail.com';
		const password = 'Admin1234!';
		// dispatch(register(username, email, password));
		dispatch(login(email, password));
	});

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
