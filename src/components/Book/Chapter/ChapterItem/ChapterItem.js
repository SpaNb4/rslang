import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import parse from 'html-react-parser';
import classes from '../../../ChapterItem//ChapterItem.module.scss';
import menuClasses from '../../../Header/Header.module.scss';

import { FaVolumeUp } from 'react-icons/fa';

import Button from '../../../Button/Button';

import { buildUrl } from '../../../../common/helpers';
import { ExternalUrls, DictionarySections, menu } from '../../../../common/constants';
import { setUserWord, updateUserWord } from '../../../../store/dictionary/actions';
import { getUserId, getAuthorized, getToken } from '../../../../store/app/slices';
import { getIsTranslationOn, getIsEditDictionaryButtons, getWordsLoading } from '../../../../store/book/slices';

function ChapterItem({ wordData, handleVolume, isPlayDisabled, color }) {
	const dispatch = useDispatch();
	const loading = useSelector(getWordsLoading);
	const authorized = useSelector(getAuthorized);
	const userId = useSelector(getUserId);
	const token = useSelector(getToken);
	const [wordDifficulty, setWordDifficulty] = useState('');
	const isTranslationOn = useSelector(getIsTranslationOn);
	const isEditDictionaryButtons = useSelector(getIsEditDictionaryButtons);

	const saveToDictionaryHard = useCallback(() => {
		if (wordDifficulty !== DictionarySections.Hard) {
			setWordDifficulty(DictionarySections.Hard);
			if (wordDifficulty === DictionarySections.NotDefined) {
				dispatch(setUserWord(userId, token, wordData, DictionarySections.Hard));
			} else {
				dispatch(updateUserWord(userId, token, wordData, DictionarySections.Hard));
			}
		}
	}, [wordDifficulty, userId, token, wordData]);

	const saveToDictionaryRemoved = useCallback(() => {
		if (wordDifficulty === DictionarySections.NotDefined) {
			dispatch(setUserWord(userId, token, wordData, DictionarySections.Removed));
		} else {
			dispatch(updateUserWord(userId, token, wordData, DictionarySections.Removed));
		}
		setWordDifficulty(DictionarySections.Removed);
	}, [userId, token, wordData, wordDifficulty]);

	useEffect(() => {
		if (authorized) {
			const difficulty = wordData.userWord && wordData.userWord.difficulty;
			if (!difficulty) {
				setWordDifficulty(DictionarySections.NotDefined);
			}
			if (difficulty && difficulty === DictionarySections.Hard) {
				setWordDifficulty(DictionarySections.Hard);
			}
		}
	}, [wordData, authorized]);

	const resultsList = authorized && (
		<ul className={classes.gamesList}>
			{menu.games.map(({ linkName, icon, color, linkId }, index) => {
				const trained = wordData.userWord && wordData.userWord.optional[linkId];

				return (
					<li className={[menuClasses.menuItem, classes.gamesListItem].join(' ')} key={index}>
						<div
							className={[menuClasses.menuLink, menuClasses.innerLink, classes.listItemLink].join(' ')}
							data-color={color}
						>
							<div className={classes.gameTitle}>
								<div>{icon}</div>
								<div>{linkName}</div>
							</div>
							{trained ? (
								<div className={classes.gameAnswers}>
									<div>Правильно: {wordData.userWord.optional[linkId].correct}</div>
									<div>Неправильно: {wordData.userWord.optional[linkId].wrong}</div>
								</div>
							) : (
								<div className={classes.gameAnswers}>Не изучено</div>
							)}
						</div>
					</li>
				);
			})}
		</ul>
	);

	return (
		<div
			className={classes.chapterItem}
			data-difficulty={wordDifficulty}
			data-color={color}
			data-group={wordData.group}
			data-page={wordData.page}
		>
			<div className={classes.itemImage}>
				<img src={buildUrl(ExternalUrls.Root, wordData.image)} alt={wordData.word} />
			</div>
			<div className={classes.itemInfo}>
				<div className={classes.itemTitle}>
					<div>{wordData.word}</div>
					<div>{wordData.transcription}</div>
					<div className={isTranslationOn ? null : classes.Hide}>{wordData.wordTranslate}</div>
					<Button handler={() => handleVolume(wordData)} disabled={isPlayDisabled} color={color}>
						<FaVolumeUp />
					</Button>
				</div>
				<div className={classes.itemParagraph}>
					<div>
						<strong>Meaning:</strong>
					</div>
					<div>{parse(wordData.textMeaning)}</div>
				</div>
				<div
					className={
						isTranslationOn ? classes.itemParagraph : [classes.itemParagraph, classes.Hide].join(' ')
					}
				>
					<div>{parse(wordData.textMeaningTranslate)}</div>
				</div>
				<div className={classes.itemParagraph}>
					<div>
						<strong>Example:</strong>
					</div>
					<div>{parse(wordData.textExample)}</div>
				</div>
				<div
					className={
						isTranslationOn ? classes.itemParagraph : [classes.itemParagraph, classes.Hide].join(' ')
					}
				>
					<div>{parse(wordData.textExampleTranslate)}</div>
				</div>
			</div>
			<div
				className={
					isEditDictionaryButtons && authorized
						? classes.itemSettings
						: [classes.itemSettings, classes.Hide].join(' ')
				}
			>
				<Button
					handler={saveToDictionaryHard}
					disabled={!authorized || loading}
					difficulty={wordDifficulty}
					color={color}
				>
					Сложное слово
				</Button>
				<Button handler={saveToDictionaryRemoved} disabled={!authorized || loading} color={color}>
					Удалить
				</Button>
			</div>
			<div className={authorized ? classes.itemResults : [classes.itemResults, classes.Hide].join(' ')}>
				{resultsList}
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
			optional: PropTypes.shape({
				word: PropTypes.string,
			}),
		}),
		group: PropTypes.number,
		page: PropTypes.number,
	}).isRequired,
	handleVolume: PropTypes.func,
	isPlayDisabled: PropTypes.bool,
	color: PropTypes.string,
};

export default React.memo(ChapterItem);
