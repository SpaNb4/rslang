import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import parse from 'html-react-parser';
import classes from './ChapterItem.module.scss';

import { FaVolumeUp } from 'react-icons/fa';

import Button from '../../../Button/Button';

import { buildUrl } from '../../../../common/helpers';
import { ExternalUrls, DictionarySections } from '../../../../common/constants';
import { setUserWord, updateUserWord } from '../../../../store/dictionary/actions';
import { getUserId, getAuthorized, getToken } from '../../../../store/app/slices';
function ChapterItem({ wordData }) {
	const dispatch = useDispatch();
	const authorized = useSelector(getAuthorized);
	const userId = useSelector(getUserId);
	const token = useSelector(getToken);
	const [hard, setHard] = useState(false);
	const [removed, setRemoved] = useState(false);
	const [savedHard, setSavedHard] = useState(hard);
	const [savedTrained, setSavedTrained] = useState(false);

	const saveToDictionaryHard = useCallback(() => {
		setHard(!hard);
		setSavedHard(true);
	}, [hard]);

	const saveToDictionaryRemoved = useCallback(() => {
		setRemoved(true);
		setHard(false);
		setSavedHard(false);
	}, [hard]);

	const handleVolumeUp = useCallback(() => {
		const { audio, audioMeaning, audioExample } = wordData;
		const urlsList = [audio, audioMeaning, audioExample];
		const audioList = urlsList.map((url) => new Audio(buildUrl(ExternalUrls.Root, url)));
		audioList[0].play();
		audioList[0].onended = () => {
			audioList[1].play();
			audioList[1].onended = () => {
				audioList[2].play();
			};
		};
	});

	useEffect(() => {
		if (authorized) {
			if (!savedTrained) {
				const trained = wordData.userWord
					? wordData.userWord.difficulty === DictionarySections.Trained
						? true
						: false
					: false;
				const hardInitial = wordData.userWord
					? wordData.userWord.difficulty === DictionarySections.Hard
						? true
						: false
					: false;
				setHard(hardInitial);
				if (!trained && !hardInitial) {
					console.log('post trained');
					const section = DictionarySections.Trained;
					dispatch(setUserWord(userId, token, wordData, section));
				}
				setSavedTrained(true);
			}
			if (hard && savedHard) {
				console.log('update hard');
				const section = DictionarySections.Hard;
				dispatch(updateUserWord(userId, token, wordData, section));
			} else if (!hard && savedHard) {
				console.log('update trained');
				const section = DictionarySections.Trained;
				dispatch(updateUserWord(userId, token, wordData, section));
			}
			if (removed) {
				console.log('update removed');
				const section = DictionarySections.Removed;
				dispatch(updateUserWord(userId, token, wordData, section));
			}
		}
	}, [authorized, savedTrained, removed, savedHard, hard, userId, token, wordData]);

	return (
		<div className={classes.chapterItem} id={hard && 'hardWord'}>
			<div className={classes.itemImage}>
				<img src={buildUrl(ExternalUrls.Root, wordData.image)} alt={wordData.word} />
			</div>
			<div className={classes.itemInfo}>
				<div className={classes.itemTitle}>
					<div>{wordData.word}</div>
					<div>{wordData.transcription}</div>
					<div>{wordData.wordTranslate}</div>
					<Button handler={handleVolumeUp}>
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
					difficulty={hard ? DictionarySections.Hard : ''}
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
