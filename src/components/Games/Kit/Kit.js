import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import sampleSize from 'lodash/sampleSize';
import shuffle from 'lodash/shuffle';
import HiddenChar from './HiddenChar';
import ShuffledChar from './ShuffledChar';
import IconStar from './IconStar';
import { getCurrCharIndex, getCurrWordIndex, getRandomWords, getAnswers } from '../../../store/kit/slices';
import {
	setRandomWords,
	setCurrentWord,
	addAnswer,
	increaseFocusedIndex,
	reduceFocusedIndex,
	resetGame,
} from '../../../store/kit/actions';
import { evtKeys } from '../../../common/constants';
import { finishGame } from '../../../store/game/actions';
import { getStreak, playWrong, playCorrect } from '../../../common/helpers';
import classes from './Kit.module.scss';

const NUMBER_OF_WORDS = 5;

const Kit = ({ wordData }) => {
	const dispatch = useDispatch();
	const randomWords = useSelector(getRandomWords);
	const currWordIndex = useSelector(getCurrWordIndex);
	const currCharIndex = useSelector(getCurrCharIndex);
	const answers = useSelector(getAnswers);

	const [currWordObj, setCurrWordObj] = useState(null);
	const [normCurrWord, setNormCurrWord] = useState([]);
	const [shuffCurrWord, setShuffCurrWord] = useState([]);

	useEffect(() => {
		if (wordData.length) {
			dispatch(setRandomWords(sampleSize(wordData, NUMBER_OF_WORDS).map((elem) => elem)));
		}
	}, [wordData]);

	useEffect(() => {
		if (randomWords.length && currWordIndex < randomWords.length) {
			setCurrWordObj(randomWords[currWordIndex]);
		}
	}, [randomWords, currWordIndex]);

	useEffect(() => {
		if (currWordObj) {
			const word = currWordObj.word;
			dispatch(setCurrentWord(word));
			setShuffCurrWord(shuffle(word));
			setNormCurrWord(word.split(''));
		}
	}, [currWordObj]);

	useEffect(() => {
		if (currCharIndex && currCharIndex === normCurrWord.length) {
			playCorrect();
			dispatch(addAnswer(currWordIndex));
		}
	}, [currCharIndex]);

	const handleSkipWord = useCallback(() => {
		playWrong();
		dispatch(addAnswer(null));
	}, []);

	useEffect(() => {
		if (currWordIndex && currWordIndex === randomWords.length) {
			const result = {
				correct: randomWords.filter((_, index) => answers[index] || answers[index] === 0),
				wrong: randomWords.filter((_, index) => !answers[index] && answers[index] !== 0),
				streak: getStreak(answers),
				words: randomWords.map((wordData) => wordData.word),
			};

			dispatch(finishGame(result));
			dispatch(resetGame());
		}
	}, [currWordIndex]);

	const handleKeyDown = (evt) => {
		switch (evt.key) {
			case evtKeys.left:
				dispatch(reduceFocusedIndex());
				break;
			case evtKeys.right:
				dispatch(increaseFocusedIndex());
				break;
			case evtKeys.space:
				handleSkipWord();
				break;
		}
	};

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

	return (
		<>
			{currWordObj && (
				<div className={classes.gameField}>
					<ul className={classes.starList}>
						{randomWords.length &&
							randomWords.map((_, index) => {
								return <IconStar key={`star-${index}`} index={index} />;
							})}
					</ul>
					{currWordObj && (
						<>
							<p className={classes.translatedWord}>{currWordObj.wordTranslate}</p>
							<div className={classes.word}>
								{normCurrWord &&
									normCurrWord.map((char, index) => {
										return <HiddenChar index={index} key={`char${index}`} char={char} />;
									})}
							</div>

							<div className={classes.word}>
								{shuffCurrWord &&
									shuffCurrWord.map((char, index) => {
										return <ShuffledChar index={index} key={`char${index}`} char={char} />;
									})}
							</div>
						</>
					)}
					<button
						className={classes.skipButton}
						aria-label="skip word"
						onClick={handleSkipWord}
						type="button"
					>
						Пропустить слово
					</button>
				</div>
			)}
		</>
	);
};

Kit.propTypes = {
	wordData: PropTypes.array,
};

export default Kit;
