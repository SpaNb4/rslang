import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import * as _ from 'lodash';
import classes from './Chapter.module.scss';
import titleClasses from './ChapterTitle.module.scss';
import menuClasses from '../../Header/Header.module.scss';

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
	getAggregatedWords,
	getRemovedPagesForGroup,
	getRemovedWordsCountForGroup,
} from '../../../store/book/slices';
import { getUserId, getToken, getAuthorized } from '../../../store/app/slices';
import { DictionarySections, LocalStorageKeys, DefaultValues, menu } from '../../../common/constants';
import Pagination from '../../Pagination/Pagination';
import { handleVolume } from '../../../common/helpers';
import { saveRemovedPagesToLocalStorage } from '../../../common/service';

function getNextPage(currentPage, removedPages, pageCount) {
	const pageList = _.range(pageCount);
	const activePages = _.difference(pageList, [...removedPages, currentPage]);
	let nextPage = _.find(activePages, function (page) {
		return page > currentPage;
	});
	if (!nextPage) {
		nextPage = _.find(activePages, function (page) {
			return page < currentPage;
		});
	}
	return nextPage;
}

function Chapter() {
	const dispatch = useDispatch();
	const loading = useSelector(getWordsLoading);
	const words = useSelector(getAllWords);
	const aggregatedWords = useSelector(getAggregatedWords);
	const { group } = useParams();
	const [page, setPage] = useState(localStorage.getItem(LocalStorageKeys.BookPage) || '1');
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
	const removedPages = useSelector(getRemovedPagesForGroup);
	const removedWordsCountForGroup = useSelector(getRemovedWordsCountForGroup);
	const [isNoMoreWords, setIsNoMoreWords] = useState(false);
	const [isCurrentlyPlaying, setIsCurrentlyPlaying] = useState(false);

	function handlePageClick(data) {
		setPage(data.selected);
		localStorage.setItem(LocalStorageKeys.BookPage, data.selected);
	}

	useEffect(() => {
		if (authorized && removedWordsCountForGroup && removedWordsCountForGroup[page] === DefaultValues.WordsPerPage) {
			const currentPage = +page;
			if (typeof removedPages !== 'undefined' && !removedPages.includes(currentPage)) {
				dispatch(updateRemovedPagesForGroup({ group: +group - 1, page: currentPage }));
				saveRemovedPagesToLocalStorage(userId, +group - 1, currentPage);
			} else {
				dispatch(updateRemovedPagesForGroup({ group: +group - 1, page: currentPage }));
				saveRemovedPagesToLocalStorage(userId, +group - 1, currentPage);
			}

			let nextPage;
			if (!removedPages) {
				nextPage = currentPage + 1;
			} else {
				nextPage = getNextPage(currentPage, removedPages, pageCount);
			}

			setPage(nextPage);
			localStorage.setItem(LocalStorageKeys.BookPage, nextPage);
		}
	}, [authorized, aggregatedWords, page, group, removedPages, removedWordsCountForGroup]);

	useEffect(() => {
		if (removedPages && removedPages.length === pageCount) {
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
	}, [authorized, group, page, userId, token]);

	const openOptions = useCallback(() => {
		setIsOptionsOpen(!isOptionsOpen);
	}, [isOptionsOpen]);

	const chapterItems = authorized ? (
		isNoMoreWords ? (
			<div>Все слова удалены из раздела</div>
		) : (
			aggregatedWords &&
			aggregatedWords.map((word) => (
				<ChapterItem
					wordData={word}
					handleVolume={() => handleVolume(word, setIsCurrentlyPlaying)}
					key={word.word}
					isPlayDisabled={isCurrentlyPlaying ? true : false}
					color={menu.sections[+word.group].color}
				/>
			))
		)
	) : (
		words &&
		words.map((word) => (
			<ChapterItem
				wordData={word}
				handleVolume={() => handleVolume(word, setIsCurrentlyPlaying)}
				key={word.word}
				isPlayDisabled={isCurrentlyPlaying ? true : false}
				color={menu.sections[+word.group].color}
			/>
		))
	);

	const gamesList = (
		<ul className={classes.gamesList}>
			{menu.games.map(({ listName, linkName, linkId, icon, color }, index) => {
				return (
					<li className={[menuClasses.menuItem, classes.gamesListItem].join(' ')} key={index}>
						<Link
							className={[menuClasses.menuLink, menuClasses.innerLink, classes.listItemLink].join(' ')}
							to={{
								pathname: `/${listName}/${linkId}`,
							}}
							data-color={color}
						>
							{icon}
							<span>{linkName}</span>
						</Link>
					</li>
				);
			})}
		</ul>
	);

	return (
		<div className={classes.chapter}>
			<div className={classes.chapterHeader}>
				<div className={classes.chapterTitleContainer}>
					<h2 className={titleClasses.chapterTitle} data-color={menu.sections[+group - 1].color}>
						{`Раздел ${group}`}
					</h2>
					<OptionsControl openOptions={openOptions} />
					<Options isOpen={isOptionsOpen} />
				</div>
				<div className={classes.gamesListContainer}>{gamesList}</div>
			</div>
			{loading && <React.Fragment>Loading...</React.Fragment>}
			{chapterItems}
			<Pagination
				handlePageClick={handlePageClick}
				pageCount={pageCount}
				startPage={Number(page)}
				removedPages={(authorized && removedPages) || []}
				forcePage={Number(page)}
			/>
		</div>
	);
}

export default Chapter;
