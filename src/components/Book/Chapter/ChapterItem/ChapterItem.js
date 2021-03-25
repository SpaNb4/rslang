import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import parse from 'html-react-parser';
import classes from './ChapterItem.module.scss';

import { FaVolumeUp } from 'react-icons/fa';

import Button from '../../../Button/Button';

import { buildUrl, handleVolumeUp } from '../../../../common/helpers';
import { ExternalUrls, DictionarySections } from '../../../../common/constants';
import { setUserWord, updateUserWord } from '../../../../store/dictionary/actions';
import { getUserId, getAuthorized, getToken } from '../../../../store/app/slices';

function ChapterItem({ wordData }) {
	const dispatch = useDispatch();
	const authorized = useSelector(getAuthorized);
	const userId = useSelector(getUserId);
	const token = useSelector(getToken);
	const hardInitial = authorized
		? wordData.userWord && wordData.userWord.difficulty === DictionarySections.Hard
			? wordData.userWord.difficulty
			: false
		: false;
	const trained = authorized
		? wordData.userWord && wordData.userWord.difficulty === DictionarySections.Trained
			? wordData.userWord.difficulty
			: false
		: false;
	const [hard, setHard] = useState(hardInitial);
	const [removed, setRemoved] = useState(false);
	const [savedHard, setSavedHard] = useState(false);

	const saveToDictionaryHard = useCallback(() => {
		setHard(!hard);
		setSavedHard(true);
	}, [hard]);

	const saveToDictionaryRemoved = useCallback(() => {
		setRemoved(true);
	}, [hard]);

	useEffect(() => {
		if (hard && savedHard) {
			const section = DictionarySections.Hard;
			dispatch(updateUserWord(userId, token, wordData, section));
		} else if (!hard && savedHard) {
			const section = DictionarySections.Trained;
			dispatch(updateUserWord(userId, token, wordData, section));
		}
	}, [savedHard, hard, userId, token, wordData]);

	useEffect(() => {
		if (removed && hard) {
			const section = DictionarySections.Removed;
			dispatch(updateUserWord(userId, token, wordData, section));
		}
		if (removed && !hard) {
			const section = DictionarySections.Removed;
			dispatch(updateUserWord(userId, token, wordData, section));
		}
	}, [removed, hard, userId, token, wordData]);

	useEffect(() => {
		if (!trained && authorized && !hard) {
			const section = DictionarySections.Trained;
			dispatch(setUserWord(userId, token, wordData, section));
		}
		if (!trained && authorized && hard) {
			const section = DictionarySections.Trained;
			dispatch(updateUserWord(userId, token, wordData, section));
		}
	}, [trained, userId, token, wordData]);

	return (
		<div className={(hard && classes.chapterItemHard) || classes.chapterItem}>
			<div className={classes.itemImage}>
				<img src={buildUrl(ExternalUrls.Root, wordData.image)} alt={wordData.word} />
			</div>
			<div className={classes.itemInfo}>
				<div className={classes.itemTitle}>
					<div>{wordData.word}</div>
					<div>{wordData.transcription}</div>
					<div>{wordData.wordTranslate}</div>
					<Button handler={() => handleVolumeUp(wordData)}>
						<FaVolumeUp />
					</Button>
				</div>
				<div className={classes.itemParagraph}>
					<div>
						<strong>Meaning:</strong>
					</div>
					<div>{parse(wordData.textMeaning)}</div>
				</div>
				<div className={classes.itemParagraph}>
					<div>{parse(wordData.textMeaningTranslate)}</div>
				</div>
				<div className={classes.itemParagraph}>
					<div>
						<strong>Example:</strong>
					</div>
					<div>{parse(wordData.textExample)}</div>
				</div>
				<div className={classes.itemParagraph}>
					<div>{parse(wordData.textExampleTranslate)}</div>
				</div>
			</div>
			<div className={classes.itemSettings}>
				<Button
					handler={saveToDictionaryHard}
					disabled={!authorized}
					difficulty={(hard && DictionarySections.Hard) || ''}
				>
					Сложное слово
				</Button>
				<Button handler={saveToDictionaryRemoved} disabled={!authorized || removed}>
					Удалить
				</Button>
			</div>
			<div className={classes.itemResults}>
				<div className={classes.resultItem}>
					<div>Игра 1</div>
					<div>Изучено</div>
				</div>
				<div className={classes.resultItem}>
					<div>Игра 2</div>
					<div>Изучено</div>
				</div>
				<div className={classes.resultItem}>
					<div>Игра 3</div>
					<div>Повторено</div>
				</div>
				<div className={classes.resultItem}>
					<div>Игра 4</div>
					<div>Повторено</div>
				</div>
			</div>
		</div>
	);
}

ChapterItem.propTypes = {
	wordData: PropTypes.shape({
		id: PropTypes.string,
		word: PropTypes.string,
		image: PropTypes.string,
		audioExample: PropTypes.string,
		audioMeaning: PropTypes.string,
		audio: PropTypes.string,
		wordTranslate: PropTypes.string,
		transcription: PropTypes.string,
		textMeaning: PropTypes.string,
		textMeaningTranslate: PropTypes.string,
		textExample: PropTypes.string,
		textExampleTranslate: PropTypes.string,
		userWord: PropTypes.shape({
			difficulty: PropTypes.string,
		}),
		group: PropTypes.number,
		page: PropTypes.number,
	}).isRequired,
};

export default ChapterItem;
