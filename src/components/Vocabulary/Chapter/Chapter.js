import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { removeUserWord } from './../../../store/dictionary/actions';
import { getToken, getUserId } from './../../../store/app/slices';
import { getUserWordsLoading, getHardWords, getRemovedWords, getTrainedWords } from '../../../store/dictionary/slices';
import { menu, DefaultValues, LocalStorageKeys } from './../../../common/constants';
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

	useEffect(() => {
		setPageCount(Math.ceil(filteredWords.length / DefaultValues.WordsPerPage));
	}, [filteredWords]);

	let sectionName = '';
	menu.dictionary.forEach((section) => {
		if (section.linkId === group) {
			sectionName = section.linkName;
		}
	});

	const currentPageData =
		filteredWords &&
		filteredWords.slice(offset, offset + DefaultValues.WordsPerPage).map((word, index) => {
			function restoreWordToBook() {
				dispatch(removeUserWord(userId, token, word));
			}

			return (
				<ChapterItem key={index} wordData={word.optional}>
					<Button handler={restoreWordToBook}>Восстановить</Button>
				</ChapterItem>
			);
		});

	function handlePageClick(data) {
		setCurrentPage(data.selected);
		localStorage.setItem(LocalStorageKeys.VocabularyPage, data.selected);
	}

	return (
		<div className={classes.chapter}>
			<div className={classes.chapterTitle}>
				<h2>{sectionName}</h2>
			</div>
			{loading && <React.Fragment>Loading...</React.Fragment>}
			{currentPageData}
			<Pagination handlePageClick={handlePageClick} pageCount={pageCount} startPage={Number(currentPage)} />
		</div>
	);
}

export default Chapter;
