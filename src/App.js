import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import { fetchWords } from './store/book/actions';
import { getCurrentGroup, getCurrentPage } from './store/book/slices';

import Header from './components/Header/Header';
import Features from './components/Features/Features';
import Team from './components/Team/Team';
import Video from './components/Video/Video';
import Kit from './components/Kit/Kit';

import { globalClasses as c } from './common/constants';

function App() {
	const dispatch = useDispatch();
	const currentGroup = useSelector(getCurrentGroup);
	const currentPage = useSelector(getCurrentPage);

	useEffect(() => {
		dispatch(fetchWords(currentGroup, currentPage));
	}, [currentGroup, currentPage]);

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
					<Route path="/Kit" component={Kit} />
				</Switch>
			</main>
		</React.Fragment>
	);
}

export default App;
