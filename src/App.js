import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchWords } from './store/book/actions';
import { getCurrentGroup, getCurrentPage } from './store/book/slices';

import Header from './components/Header/Header';

function App() {
	const dispatch = useDispatch();
	const currentGroup = useSelector(getCurrentGroup);
	const currentPage = useSelector(getCurrentPage);

	useEffect(() => {
		dispatch(fetchWords(currentGroup, currentPage));
	}, [currentGroup, currentPage]);

	return (
		<div>
			<Header />
		</div>
	);
}

export default App;
