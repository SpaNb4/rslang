import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import classes from './Chapter.module.scss';

import ChapterItem from './ChapterItem/ChapterItem';
import OptionsControl from './OptionsControl/OptionsControl';
import Options from './Options/Options';

import { fetchAggregatedWords, fetchWords, updateCurrentGroup } from '../../../store/book/actions';
import { getWordsLoading, getAllWords, getCurrentPage, getAggregatedWordsWords } from '../../../store/book/slices';
import { getUserId, getToken, getAuthorized } from '../../../store/app/slices';
import { DictionarySections } from '../../../common/constants';

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
	const [isOptionsOpen, setIsOptionsOpen] = useState(false);

	useEffect(() => {
		if (authorized) {
			const filterRules = JSON.stringify({
				$or: [
					{ 'userWord.difficulty': DictionarySections.Hard },
					{ 'userWord.difficulty': DictionarySections.Trained },
					{ userWord: null },
				],
			});
			dispatch(fetchAggregatedWords(group, page, userId, token, filterRules));
		} else {
			dispatch(fetchWords(group, page));
		}
	}, [authorized, group, page, userId, token]);

	useEffect(() => {
		dispatch(updateCurrentGroup(group));
	}, [group]);

	const openOptions = useCallback(() => {
		setIsOptionsOpen(!isOptionsOpen);
	}, [isOptionsOpen]);

	const chapterItems = authorized ? (
		aggregatedWords && aggregatedWords.length ? (
			aggregatedWords.map((word, index) => <ChapterItem wordData={word} key={index} />)
		) : loading ? null : (
			<div>No more words...</div>
		)
	) : (
		words && words.map((word, index) => <ChapterItem wordData={word} key={index} />)
	);

	return (
		<div className={classes.chapter}>
			<div className={classes.chapterHeader}>
				<h2 className={classes.chapterTitle}>{`Раздел ${group}`}</h2>
				<OptionsControl openOptions={openOptions} />
				<Options isOpen={isOptionsOpen} />
			</div>
			{loading && <React.Fragment>Loading...</React.Fragment>}
			{chapterItems}
		</div>
	);
}

export default Chapter;
