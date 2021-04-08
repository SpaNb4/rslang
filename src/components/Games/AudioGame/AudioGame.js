/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import shuffle from 'lodash/shuffle';
import sampleSize from 'lodash/sampleSize';
import max from 'lodash/max';
import map from 'lodash/map';
import { useHotkeys } from 'react-hotkeys-hook';
import { AiFillSound } from 'react-icons/ai';
import { ExternalUrls } from '../../../common/constants';
import { useDispatch } from 'react-redux';
import classes from './AudioGame.module.scss';
import { playWrong, playCorrect } from '../../../common/helpers';
import { PropTypes } from 'prop-types';
import { finishGame } from './../../../store/game/actions';
import { ONE_SECONDS_IN_MS } from './../../../common/constants';

let timeStamp = 0;
function AudioGame({ wordData }) {
	const dispatch = useDispatch();
	const words = wordData;
	const [currWord, setCurrWord] = useState(null);
	const [currWordIndex, setCurrWordIndex] = useState(0);
	const [randomWords, setRandomWords] = useState(null);
	const [commonWords, setCommonWords] = useState(null);
	const [corrAnswersWords, setCorrAnswersWords] = useState([]);
	const [wrongAnswersWords, setWrongAnswersWords] = useState([]);
	const [isWordClicked, setIsWordClicked] = useState(false);
	const [currStreak, setCurrStreak] = useState(0);
	const [streakArr, setStreakArr] = useState([]);
	const audioRef = useRef(null);
	const [isGameEnd, setIsGameEnd] = useState(false);

	const randomWordCount = 4;

	useEffect(() => {
		if (isGameEnd && [...corrAnswersWords, ...wrongAnswersWords].length === words.length) {
			const resWords = words.map((el) => el.word);
			const maxStreak = max(streakArr);

			dispatch(
				finishGame({
					correct: corrAnswersWords,
					wrong: wrongAnswersWords,
					streak: maxStreak,
					words: map(resWords, 'word'),
				})
			);
		}
	}, [corrAnswersWords, wrongAnswersWords, isGameEnd]);

	useEffect(() => {
		if (words) {
			// set 4 random
			setRandomWords(sampleSize(words, randomWordCount));
			// set correct word
			setCurrWord(words[currWordIndex]);
		}
	}, [words]);

	useEffect(() => {
		if (randomWords) {
			// common words arr (random words + correct word)
			const commonWords = [...randomWords, words[currWordIndex]];

			// set shuffled array
			setCommonWords(shuffle(commonWords));
		}
	}, [randomWords]);

	useEffect(() => {
		if (words) {
			setCurrWord(words[currWordIndex]);

			const filteredArr = words.filter((item) => item !== words[currWordIndex]);
			setRandomWords(sampleSize(filteredArr, randomWordCount));
			setIsWordClicked(false);
		}
	}, [currWordIndex]);

	useEffect(() => {
		if (audioRef.current) {
			audioClickHandler({ target: audioRef.current }, currWord);
		}
	}, [currWord]);

	function handleWrongWordClick() {
		checkEndWords();

		setWrongAnswersWords([...wrongAnswersWords, currWord]);
		setIsWordClicked(true);

		playWrong();

		setStreakArr([...streakArr, currStreak]);
		setCurrStreak(0);
	}

	function handleCorrectWordClick() {
		checkEndWords();

		// go to next word
		setCorrAnswersWords([...corrAnswersWords, currWord]);
		setIsWordClicked(true);

		playCorrect();

		setCurrStreak(currStreak + 1);
	}

	function checkEndWords() {
		if (currWordIndex === words.length - 1) {
			setIsGameEnd(true);
		}
	}

	function audioClickHandler(e, word) {
		const sound = new Audio(`${ExternalUrls.Root}${word.audio}`);
		sound.play();

		e.target.classList.add(classes.playing);

		sound.onended = () => {
			e.target.classList.remove(classes.playing);
		};
	}

	function nextClickHandler() {
		if (isWordClicked) {
			setCurrWordIndex(currWordIndex + 1);
		} else {
			handleWrongWordClick();
		}
	}

	const keysStr = '1,2,3,4,5';

	useHotkeys(
		keysStr,
		(e) => {
			keyHandler(e);
		},
		[commonWords, currWord, isWordClicked]
	);

	function keyHandler(e) {
		if (commonWords && !isWordClicked) {
			// e.key-1 coz we press 1, but array index starts with 0
			if (commonWords[e.key - 1] === currWord) {
				handleCorrectWordClick();
			} else {
				handleWrongWordClick();
			}
		}
	}

	useHotkeys(
		'enter',
		(e) => {
			if (e.timeStamp - timeStamp > ONE_SECONDS_IN_MS) {
				timeStamp = e.timeStamp;
				enterKeyHandler();
			}
		},
		[isWordClicked]
	);

	function enterKeyHandler() {
		nextClickHandler();
	}

	return (
		<div className={classes.audioGame}>
			{currWord && (
				<>
					{!isWordClicked && (
						<div
							ref={audioRef}
							className={classes.audioWrapper}
							onClick={(e) => audioClickHandler(e, currWord)}
						>
							<AiFillSound className={classes.audio} />
						</div>
					)}

					{isWordClicked && (
						<>
							<div className={classes.imgWrapper}>
								<img src={`${ExternalUrls.Root}` + currWord.image} />
							</div>
							<div className={classes.currWordWrapper}>
								<AiFillSound
									className={classes.smallAudio}
									onClick={(e) => audioClickHandler(e, currWord)}
								/>
								<h3 className={classes.currWord}>{currWord.word}</h3>
							</div>
						</>
					)}

					{commonWords && (
						<div className={classes.wordList}>
							{commonWords.map((word, index) => {
								return (
									<div
										className={
											word === currWord
												? isWordClicked
													? [classes.wordListItem, classes.correctWord].join(' ')
													: classes.wordListItem
												: isWordClicked
												? [classes.wordListItem, classes.wrongWord].join(' ')
												: classes.wordListItem
										}
										key={index}
										onClick={word === currWord ? handleCorrectWordClick : handleWrongWordClick}
									>
										<span>{index + 1}</span> {word.wordTranslate}
									</div>
								);
							})}
						</div>
					)}
					<div className={classes.btn} onClick={nextClickHandler}>
						{isWordClicked ? 'Далее' : 'Не знаю'}
					</div>
				</>
			)}
		</div>
	);
}

AudioGame.propTypes = {
	wordData: PropTypes.array,
};

export default AudioGame;
