/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import classes from './Chapter.module.scss';

import ChapterItem from './ChapterItem/ChapterItem';

import { fetchUserWords } from './../../../store/dictionary/actions';
import { getToken, getUserId } from './../../../store/app/slices';
import { getUserWordsLoading, getUserWords } from '../../../store/dictionary/slices';
import { VOCABULARY_SECTIONS } from './../../../common/constants';
import Pagination from '../../Pagination/Pagination';

function Chapter() {
	const dispatch = useDispatch();
	const loading = useSelector(getUserWordsLoading);
	const words = useSelector(getUserWords);
	const { group } = useParams();
	const userId = useSelector(getUserId);
	const token = useSelector(getToken);

	let sectionName = '';
	VOCABULARY_SECTIONS.forEach((section) => {
		if (section.linkId === group) {
			sectionName = section.linkName;
		}
	});

	useEffect(() => {
		if (userId && token) {
			dispatch(fetchUserWords(userId, token));
		}
	}, []);

	const filteredWords = words && words.filter((word) => word.difficulty == group);

	const [currentPage, setCurrentPage] = useState(0);
	const PER_PAGE = 20;
	const offset = currentPage * PER_PAGE;
	const currentPageData = filteredWords.slice(offset, offset + PER_PAGE).map((word, index) => {
		return <ChapterItem wordData={word} key={index} />;
	});
	const pageCount = Math.ceil(filteredWords.length / PER_PAGE);

	function handlePageClick(data) {
		setCurrentPage(data.selected);
	}

	return (
		<div className={classes.chapter}>
			<div className={classes.chapterTitle}>
				<h2>{sectionName}</h2>
			</div>
			{loading && <React.Fragment>Loading...</React.Fragment>}
			{currentPageData}
			<Pagination handlePageClick={handlePageClick} pageCount={pageCount} />
		</div>
	);
}

export default Chapter;
