import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchWords } from './store/book/actions';
import { getCurrentGroup, getCurrentPage } from './store/book/slices';

import Header from './components/Header/Header';
import Features from './components/Features/Features';
import Team from './components/Team/Team';
import Video from './components/Video/Video';
import { CONTAINER } from './common/constants';

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
			<main className={CONTAINER}>
				<Features />
				<Video />
				<Team />
			</main>
		</React.Fragment>
	);
}

export default App;
