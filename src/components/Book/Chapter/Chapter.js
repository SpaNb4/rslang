import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as _ from 'lodash';
import classes from './Chapter.module.scss';

import ChapterItem from './ChapterItem/ChapterItem';
import OptionsControl from './OptionsControl/OptionsControl';
import Options from './Options/Options';

import {
	fetchAggregatedWords,
	fetchWords,
	updateCurrentGroup,
	updateRemovedPagesForGroup,
} from '../../../store/book/actions';
import {
	getWordsLoading,
	getAllWords,
	getAggregatedWordsWords,
	getRemovedPagesForGroup,
} from '../../../store/book/slices';
import { getUserId, getToken, getAuthorized } from '../../../store/app/slices';
import { DictionarySections, LocalStorageKeys, DefaultValues } from '../../../common/constants';
import Pagination from '../../Pagination/Pagination';

function Chapter() {
	const dispatch = useDispatch();
	const loading = useSelector(getWordsLoading);
	const words = useSelector(getAllWords);
	const aggregatedWords = useSelector(getAggregatedWordsWords);
	const { group } = useParams();
	const [page, setPage] = useState(localStorage.getItem(LocalStorageKeys.BookPage) || '0');
	const userId = useSelector(getUserId);
	const token = useSelector(getToken);
	const authorized = useSelector(getAuthorized);
	const [isOptionsOpen, setIsOptionsOpen] = useState(false);
	const pageCount = 30;
	const filterRules = JSON.stringify({
		$or: [
			{ 'userWord.difficulty': DictionarySections.Hard },
			{ 'userWord.difficulty': DictionarySections.Trained },
			{ userWord: null },
		],
	});
	const [removedWords, setRemovedWords] = useState([]);
	const removedPages = useSelector((store) => getRemovedPagesForGroup(store, group));
	const [isNoMoreWords, setIsNoMoreWords] = useState(false);

	function handlePageClick(data) {
		setPage(data.selected);
		localStorage.setItem(LocalStorageKeys.BookPage, data.selected);
	}

	useEffect(() => {
		if (removedWords.length === DefaultValues.WordsPerPage) {
			dispatch(updateRemovedPagesForGroup({ group: +group - 1, page: +page }));
			setPage(String(+page + 1));
		}
	}, [removedWords, page, group]);

	useEffect(() => {
		if (removedPages.length === pageCount) {
			setIsNoMoreWords(true);
		}
	}, [removedPages]);

	useEffect(() => {
		if (authorized) {
			dispatch(fetchAggregatedWords(+group - 1, page, userId, token, filterRules));
		} else {
			dispatch(fetchWords(+group - 1, page));
		}
		dispatch(updateCurrentGroup(+group - 1));
		setRemovedWords([]);
	}, [authorized, group, page, userId, token]);

	const openOptions = useCallback(() => {
		setIsOptionsOpen(!isOptionsOpen);
	}, [isOptionsOpen]);

	const saveToRemoved = useCallback(
		(wordData) => {
			setRemovedWords([...removedWords, wordData]);
		},
		[removedWords]
	);

	console.log(removedWords);

	const chapterItems = authorized ? (
		isNoMoreWords ? (
			<div>Все слова удалены из раздела</div>
		) : (
			aggregatedWords &&
			_.differenceBy(aggregatedWords, removedWords, 'word').map((word, index) => (
				<ChapterItem wordData={word} key={index} saveToRemoved={saveToRemoved} />
			))
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
			<Pagination
				handlePageClick={handlePageClick}
				pageCount={pageCount}
				startPage={Number(page)}
				removedPages={removedPages}
			/>
		</div>
	);
}

export default Chapter;
