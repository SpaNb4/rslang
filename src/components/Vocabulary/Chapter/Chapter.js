import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { removeUserWord } from './../../../store/dictionary/actions';
import { getToken, getUserId } from './../../../store/app/slices';
import { getUserWordsLoading, getHardWords, getRemovedWords, getTrainedWords } from '../../../store/dictionary/slices';
import { menu, DefaultValues, LocalStorageKeys, DictionarySections } from './../../../common/constants';
import Pagination from '../../Pagination/Pagination';
import ChapterItem from '../../ChapterItem/ChapterItem';
import classes from './Chapter.module.scss';
import Button from '../../Button/Button';
import GamesList from './../../GamesList/GamesList';
import { getRemovedPages } from '../../../store/book/slices';
import { updateRemovedPagesForGroup, updateRemovedWordsCountForPage } from '../../../store/book/actions';
import { saveRemovedPagesToLocalStorage } from '../../../common/service';

function Chapter() {
	const pageArr = JSON.parse(localStorage.getItem(LocalStorageKeys.VocabularyPage)) || [
		{ section: 0, page: 0 },
		{ section: 1, page: 0 },
		{ section: 2, page: 0 },
		{ section: 3, page: 0 },
		{ section: 4, page: 0 },
		{ section: 5, page: 0 },
	];
	const dispatch = useDispatch();
	const loading = useSelector(getUserWordsLoading);
	const { group } = useParams();
	const userId = useSelector(getUserId);
	const token = useSelector(getToken);
	const [currentSection, setCurrentSection] = useState(
		JSON.parse(localStorage.getItem(LocalStorageKeys.VocabularySection)) || 0
	);
	const [page, setPage] = useState(
		(JSON.parse(localStorage.getItem(LocalStorageKeys.VocabularyPage)) &&
			JSON.parse(localStorage.getItem(LocalStorageKeys.VocabularyPage))[currentSection].page) ||
			0
	);

	const offset = page * DefaultValues.WordsPerPage;
	const filter = {
		hard: useSelector(getHardWords),
		removed: useSelector(getRemovedWords),
		trained: useSelector(getTrainedWords),
	};
	const [pageCount, setPageCount] = useState(0);

	const filteredWords = filter[group] && filter[group].filter((word) => currentSection === word.optional.group);
	const [isCurrentlyPlaying, setIsCurrentlyPlaying] = useState(false);

	let sectionName = '';
	menu.dictionary.forEach((section) => {
		if (section.linkId === group) {
			sectionName = section.linkName;
		}
	});

	const currentPageData =
		filteredWords &&
		filteredWords
			.slice(offset, offset + DefaultValues.WordsPerPage)
			.map((el) => ({ ...el.optional, difficulty: el.difficulty }));

	const removedPages = useSelector(getRemovedPages);

	useEffect(() => {
		setPageCount(Math.ceil(filteredWords.length / DefaultValues.WordsPerPage));
	}, [filteredWords]);

	function restoreWordToBook(word) {
		dispatch(removeUserWord(userId, token, word));
		if (removedPages[word.group].includes(word.page)) {
			dispatch(updateRemovedPagesForGroup({ group: word.group, page: word.page, action: 'restore' }));
			saveRemovedPagesToLocalStorage(userId, word.group, word.page, 'restore');
		}
		dispatch(updateRemovedWordsCountForPage({ group: word.group, page: word.page, action: 'decrement' }));
	}

	function handlePageClick(data) {
		if (page !== data.selected) {
			setPage(data.selected);

			pageArr.forEach((el) => {
				if (el.section === currentSection) {
					el.page = data.selected;
				}
			});

			localStorage.setItem(LocalStorageKeys.VocabularyPage, JSON.stringify(pageArr));
		}
	}

	function sectionClickHandler(index) {
		setCurrentSection(index);

		localStorage.setItem(LocalStorageKeys.VocabularySection, index);
	}

	useEffect(() => {
		if (localStorage.getItem(LocalStorageKeys.VocabularyPage)) {
			setPage(JSON.parse(localStorage.getItem(LocalStorageKeys.VocabularyPage))[currentSection].page);
		}
	}, [currentSection]);

	const sectionList = (
		<ul className={classes.sectionList}>
			{menu.sections.map((item, index) => {
				return (
					<li
						className={index === currentSection ? classes.activeSection : null}
						onClick={() => sectionClickHandler(index)}
						key={index}
					>
						{item.linkName}
					</li>
				);
			})}
		</ul>
	);

	return (
		<div className={classes.chapter}>
			<div className={classes.chapterTitleContainer}>
				<h2>{sectionName}</h2>
			</div>

			<GamesList words={currentPageData} group={Number(group) - 1} page={Number(page)} />

			<div className={classes.sectionListTitle}>
				<h3>Раздел учебника</h3>
			</div>
			{sectionList}

			{filter[group].length && (
				<div className={classes.progress}>
					<h3 className={classes.progressTitel}>Прогресс изучения</h3>
					<div className={classes.progressValue}>
						Раздел - {filteredWords.length}/{filter[group].length}
					</div>
					<div className={classes.progressValue}>
						Страница - {currentPageData.length}/{DefaultValues.WordsPerPage}
					</div>
				</div>
			)}

			{loading && <React.Fragment>Loading...</React.Fragment>}
			{currentPageData.length ? (
				<>
					{currentPageData.map((word, index) => {
						return (
							<ChapterItem
								key={index}
								wordData={word}
								id={group === DictionarySections.Hard ? null : word.difficulty}
								isPlayDisabled={isCurrentlyPlaying ? true : false}
								setIsCurrentlyPlaying={setIsCurrentlyPlaying}
								color={menu.sections[+word.group].color}
							>
								<Button handler={() => restoreWordToBook(word)}>Восстановить</Button>
							</ChapterItem>
						);
					})}
					{filteredWords.length <= DefaultValues.WordsPerPage ? null : (
						<Pagination
							handlePageClick={handlePageClick}
							pageCount={pageCount}
							startPage={page}
							forcePage={page}
						/>
					)}
				</>
			) : (
				<h3 className={classes.noWords}>
					В данном разделе нет слов, чтобы их добавить, перейдите в данный раздел учебника и нажмите
					соответствующие кнопки
				</h3>
			)}
		</div>
	);
}

export default Chapter;
