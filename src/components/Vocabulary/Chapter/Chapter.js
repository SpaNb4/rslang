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
import {} from './../../../store/dictionary/slices';

function Chapter() {
	const dispatch = useDispatch();
	const loading = useSelector(getUserWordsLoading);
	const { group } = useParams();
	const userId = useSelector(getUserId);
	const token = useSelector(getToken);
	const initialPage = localStorage.getItem(LocalStorageKeys.VocabularyPage) || 0;
	const [currentPage, setCurrentPage] = useState(initialPage);
	const offset = currentPage * DefaultValues.WordsPerPage;
	const filter = {
		hard: useSelector(getHardWords),
		removed: useSelector(getRemovedWords),
		trained: useSelector(getTrainedWords),
	};
	const filteredWords = filter[group];
	const [pageCount, setPageCount] = useState(0);
	const [currentSection, setCurrentSection] = useState(0);

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
			.filter((word) => currentSection === word.optional.group)
			.map((word, index) => {
				return (
					<ChapterItem
						key={index}
						wordData={word.optional}
						id={group === DictionarySections.Hard ? null : word.difficulty}
					>
						<Button handler={() => restoreWordToBook(word)}>Восстановить</Button>
					</ChapterItem>
				);
			});

	useEffect(() => {
		setPageCount(Math.ceil(currentPageData.length / DefaultValues.WordsPerPage));
	}, [currentPageData]);

	function restoreWordToBook(word) {
		dispatch(removeUserWord(userId, token, word));
	}

	function handlePageClick(data) {
		setCurrentPage(data.selected);
		localStorage.setItem(LocalStorageKeys.VocabularyPage, data.selected);
	}

	function sectionClickHandler(index) {
		setCurrentSection(index);
	}

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
			<div className={classes.chapterTitle}>
				<h2>{sectionName}</h2>
			</div>
			<div className={classes.sectionListTitle}>
				<h3>Раздел учебника</h3>
			</div>
			{sectionList}
			{loading && <React.Fragment>Loading...</React.Fragment>}
			{currentPageData.length ? (
				<>
					{currentPageData}
					<Pagination
						handlePageClick={handlePageClick}
						pageCount={pageCount}
						startPage={Number(currentPage)}
					/>
				</>
			) : (
				<h3 className={classes.noWords}>
					В данной разделе нет слов, чтобы их добавить, перейдите в данный раздел учебника и нажмите
					соответствующие кнопки
				</h3>
			)}
		</div>
	);
}

export default Chapter;
