import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import sampleSize from 'lodash/sampleSize';
import shuffle from 'lodash/shuffle';
import { getAllWords } from '../../../store/book/slices';
import {
	getCurrCharIndex,
	getCurrWordIndex,
	getCurrentWord,
	getRandomWords,
	getAnswers,
} from '../../../store/kit/slices';
import { setRandomWords, increaseCharIndex, setCurrentWord, addAnswer } from '../../../store/kit/actions';
import classes from './Kit.module.scss';
import { FaStar } from 'react-icons/fa';

const NUMBER_OF_WORDS = 3;
const DELAY = 1000;

const colors = {
	error: '#f00',
	correct: `#fd0`,
};

const HiddenChar = ({ char, index }) => {
	const [hidden, setHidden] = useState(true);
	const currCharIndex = useSelector(getCurrCharIndex);
	const currentWord = useSelector(getCurrentWord);

	useEffect(() => {
		if (index === currCharIndex - 1) {
			setHidden(false);
		}
	}, [currCharIndex]);

	useEffect(() => {
		setHidden(true);
	}, [currentWord]);

	return (
		<span className={classes.hiddenCharWrapper}>
			<span className={classes.hiddenChar} aria-hidden={hidden}>
				{char}
			</span>
		</span>
	);
};

const ShuffledChar = ({ char }) => {
	const dispatch = useDispatch();
	const currentWord = useSelector(getCurrentWord);
	const currCharIndex = useSelector(getCurrCharIndex);
	const [selected, setSelected] = useState(false);

	const handleClick = (evt) => {
		const char = evt.target.value;

		if (!selected && char === currentWord[currCharIndex]) {
			setSelected(true);
			dispatch(increaseCharIndex());
		}
	};

	useEffect(() => {
		setSelected(false);
	}, [currentWord]);

	return (
		<button
			className={classes.shuffledChar}
			type="button"
			aria-label="choose letter"
			aria-selected={selected}
			value={char}
			onClick={handleClick}
		>
			{char}
		</button>
	);
};

const IconStar = ({ index }) => {
	const answers = useSelector(getAnswers);
	const [iconColor, setIconColor] = useState('');

	useEffect(() => {
		if (answers.includes(index)) {
			setIconColor(colors.correct);
		} else if (answers[index] === null) {
			setIconColor(colors.error);
		}
	}, [answers]);

	return (
		<li data-index={index}>
			<FaStar color={iconColor} />
		</li>
	);
};

const Kit = () => {
	const dispatch = useDispatch();
	const allWords = useSelector(getAllWords);
	const randomWords = useSelector(getRandomWords);
	const currWordIndex = useSelector(getCurrWordIndex);
	const currCharIndex = useSelector(getCurrCharIndex);
	const answers = useSelector(getAnswers);

	const [currWordObj, setCurrWordObj] = useState(null);
	const [normCurrWord, setNormCurrWord] = useState([]);
	const [shuffCurrWord, setShuffCurrWord] = useState([]);
	const [message, setMessage] = useState('loading...'); // loader mock

	useEffect(() => {
		if (allWords.length) {
			dispatch(setRandomWords(sampleSize(allWords, NUMBER_OF_WORDS)));
		}
	}, [allWords]);

	useEffect(() => {
		if (randomWords.length) {
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
		let timeout;

		if (currCharIndex && currCharIndex === normCurrWord.length) {
			timeout = setTimeout(() => {
				dispatch(addAnswer(currWordIndex));
			}, DELAY);
		}
		return () => {
			clearTimeout(timeout);
		};
	}, [currCharIndex]);

	const handleSkipWord = useCallback(() => {
		dispatch(addAnswer(null));
	}, []);

	//Game over temporary log
	useEffect(() => {
		if (currWordIndex && currWordIndex === randomWords.length) {
			const corrects = answers.filter((answer) => answer).length;
			setMessage(`Угадано: ${corrects}
			Пропущено: ${answers.length - corrects}`);
		}
	}, [currWordIndex]);

	return (
		<div className={classes.root}>
			<div className={classes.gameField}>
				<ul className={classes.starList}>
					{randomWords &&
						randomWords.map((_, index) => {
							return <IconStar key={`star-${index}`} index={index} />;
						})}
				</ul>
				{currWordObj ? (
					<React.Fragment>
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
									return <ShuffledChar key={`char${index}`} char={char} />;
								})}
						</div>
					</React.Fragment>
				) : (
					<div>{message}</div>
				)}

				<button className={classes.skipButton} aria-label="skip word" onClick={handleSkipWord} type="button">
					Пропустить слово
				</button>
			</div>
		</div>
	);
};

HiddenChar.propTypes = {
	index: PropTypes.number,
	char: PropTypes.string,
};

ShuffledChar.propTypes = {
	char: PropTypes.string,
};

IconStar.propTypes = {
	index: PropTypes.number,
};

export default Kit;
