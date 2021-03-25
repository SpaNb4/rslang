import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import classes from './Chapter.module.scss';

import ChapterItem from './ChapterItem/ChapterItem';

import { fetchAggregatedWords } from '../../../store/book/actions';
import { getWordsLoading, getAllWords, getCurrentPage, getAggregatedWordsWords } from '../../../store/book/slices';
import { getUserId, getToken, getAuthorized } from '../../../store/app/slices';

function Chapter() {
	const dispatch = useDispatch();
	const loading = useSelector(getWordsLoading);
	const words = useSelector(getAllWords);
	const aggregatedWords = useSelector(getAggregatedWordsWords);
	const { group } = useParams();
	const page = useSelector(getCurrentPage);
	const userId = useSelector(getUserId);
	const token = useSelector(getToken);
	const authorized = useSelector(getAuthorized);

	useEffect(() => {
		if (authorized) {
			console.log('get Aggregated Words');
			const wordsWithoutRemoved = JSON.stringify({ $and: [{ 'userWord.difficulty': 'hard' }] }); // TODO: добавить trained
			dispatch(fetchAggregatedWords(group, page, userId, token, wordsWithoutRemoved));
		}
	}, [authorized, group, page, userId, token]);

	const chapterItems = authorized
		? aggregatedWords && aggregatedWords.map((word, index) => <ChapterItem wordData={word} key={index} />)
		: words && words.map((word, index) => <ChapterItem wordData={word} key={index} />);

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
