import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import classes from './Chapter.module.scss';

import ChapterItem from './ChapterItem/ChapterItem';

import { fetchWords } from '../../../store/book/actions';
import { getWordsLoading, getAllWords, getCurrentPage } from '../../../store/book/slices';

function Chapter() {
	const dispatch = useDispatch();
	const loading = useSelector(getWordsLoading);
	const words = useSelector(getAllWords);
	const { group } = useParams();
	const page = useSelector(getCurrentPage);

	useEffect(() => {
		dispatch(fetchWords(group, page));
	}, [group, page]);

	const chapterItems = words && words.map((word, index) => <ChapterItem wordData={word} key={index} />);

	return (
		<div className={classes.chapter}>
			<div className={classes.chapterTitle}>
				<h2>{`Раздел ${group}`}</h2>
			</div>
			{loading && <React.Fragment>Loading...</React.Fragment>}
			{chapterItems}
		</div>
	);
}

export default Chapter;
