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
	getAggregatedWordsWords,
	getRemovedPagesForGroup,
} from '../../../store/book/slices';
import { getUserId, getToken, getAuthorized } from '../../../store/app/slices';
import { DictionarySections, LocalStorageKeys, DefaultValues, menu } from '../../../common/constants';
import Pagination from '../../Pagination/Pagination';
import { handleVolume } from '../../../common/helpers';
import { saveRemovedPagesToLocalStorage } from '../../../common/service';

function Chapter() {
	const dispatch = useDispatch();
	const loading = useSelector(getWordsLoading);
	const words = useSelector(getAllWords);
	const aggregatedWords = useSelector(getAggregatedWordsWords);
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
	const [removedWords, setRemovedWords] = useState([]);
	const removedPages = useSelector(getRemovedPagesForGroup);
	const [isNoMoreWords, setIsNoMoreWords] = useState(false);
	const [isCurrentlyPlaying, setIsCurrentlyPlaying] = useState(false);

	function handlePageClick(data) {
		setPage(data.selected);
		localStorage.setItem(LocalStorageKeys.BookPage, data.selected);
	}

	useEffect(() => {
		const currentPage = +page;
		if (removedWords && removedWords.length === DefaultValues.WordsPerPage && currentPage < pageCount) {
			console.log(currentPage);
			dispatch(updateRemovedPagesForGroup({ group: +group - 1, page: currentPage }));
			saveRemovedPagesToLocalStorage(userId, +group - 1, currentPage);
			setRemovedWords([]);

			if (removedPages) {
				let page;
				for (let nextPage = currentPage + 1; nextPage < pageCount - 1 && !page; nextPage += 1) {
					if (!removedPages.includes(nextPage)) {
						page = nextPage;
						handlePageClick({ selected: page });
					}
				}
			} else {
				let nextPage = currentPage + 1;
				handlePageClick(nextPage);
			}
		}
	}, [removedWords, page, group, removedPages]);

	useEffect(() => {
		if (removedPages && removedPages.length === pageCount) {
			setIsNoMoreWords(true);
		}
	}, [removedPages, page]);

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

	const chapterItems = authorized ? (
		isNoMoreWords ? (
			<div>Все слова удалены из раздела</div>
		) : (
			aggregatedWords &&
			_.differenceBy(aggregatedWords, removedWords, 'word').map((word, index) => (
				<ChapterItem
					wordData={word}
					key={index}
					saveToRemoved={saveToRemoved}
					handleVolume={() => handleVolume(word, setIsCurrentlyPlaying)}
					isPlayDisabled={isCurrentlyPlaying ? true : false}
					color={menu.sections[+word.group].color}
				/>
			))
		)
	) : (
		words &&
		words.map((word, index) => (
			<ChapterItem
				wordData={word}
				key={index}
				handleVolume={() => handleVolume(word, setIsCurrentlyPlaying)}
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
								state: {
									words: aggregatedWords,
									page,
								},
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
				removedPages={removedPages}
			/>
		</div>
	);
}

export default Chapter;
