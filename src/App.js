import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Features from './components/Features/Features';
import Team from './components/Team/Team';
import Video from './components/Video/Video';
import Book from './components/Book/Book';
import { CONTAINER } from './common/constants';

function App() {
	return (
		<React.Fragment>
			<Header />
			<main className={CONTAINER}>
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
