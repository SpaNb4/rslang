import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import classes from './Chapter.module.scss';

import ChapterItem from './ChapterItem/ChapterItem';

import { fetchUserWords } from './../../../store/dictionary/actions';
import { getToken, getUserId } from './../../../store/app/slices';
import { getUserWordsLoading, getUserWords } from '../../../store/dictionary/slices';
import { VOCABULARY_SECTIONS } from './../../../common/constants';

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

	const chapterItems =
		words &&
		words.map((word, index) => {
			if (word.difficulty === group) {
				return <ChapterItem wordData={word} key={index} />;
			}
		});

	return (
		<div className={classes.chapter}>
			<div className={classes.chapterTitle}>
				<h2>{sectionName}</h2>
			</div>
			{loading && <React.Fragment>Loading...</React.Fragment>}
			{chapterItems}
		</div>
	);
}

export default Chapter;
