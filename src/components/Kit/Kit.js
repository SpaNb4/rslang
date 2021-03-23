import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import sampleSize from 'lodash/sampleSize';
import shuffle from 'lodash/shuffle';
import { getAllWords } from '../../store/book/slices';
import { getCurrCharIndex, getCurrWordIndex, getCurrentWord, getRandomWords } from '../../store/kit/slices';
import { setRandomWords, increaseCharIndex, increaseWordIndex, setCurrentWord } from './../../store/kit/actions';
import classes from './Kit.module.scss';

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
		<span className={classes.hiddenChar} aria-hidden={hidden}>
			{char}
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

const Kit = () => {
	const dispatch = useDispatch();
	const allWords = useSelector(getAllWords);
	const randomWords = useSelector(getRandomWords);
	const currWordIndex = useSelector(getCurrWordIndex);
	const currCharIndex = useSelector(getCurrCharIndex);

	const [currWordObj, setCurrWordObj] = useState(null);
	const [normCurrWord, setNormCurrWord] = useState([]);
	const [shuffCurrWord, setShuffCurrWord] = useState([]);
	const [message, setMessage] = useState('loading...'); // loader mock

	const [point, setPoint] = useState(0);

	useEffect(() => {
		if (allWords.length) {
			dispatch(setRandomWords(sampleSize(allWords, 10)));
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
		if (currCharIndex && currCharIndex === normCurrWord.length) {
			setPoint((prev) => prev + 1);
			dispatch(increaseWordIndex());
		}
	}, [currCharIndex]);

	//Game over temporary log
	useEffect(() => {
		if (currWordIndex && currWordIndex === randomWords.length) {
			setMessage('game over');
		}
	}, [currWordIndex]);

	return (
		<div className={classes.root}>
			<div className={classes.gameField}>
				<span>
					Угадано {point} / {randomWords.length}
				</span>
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

				<button aria-label="skip word">Пропустить слово</button>
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

export default Kit;
