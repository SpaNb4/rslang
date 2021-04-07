import React, { useState, useEffect } from 'react';
import shuffle from 'lodash/shuffle';
import sampleSize from 'lodash/sampleSize';
import max from 'lodash/max';
import { useSpring, animated } from 'react-spring';
import { useHotkeys } from 'react-hotkeys-hook';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import classes from './Savanna.module.scss';
import { playWrong, playCorrect } from '../../../common/helpers';
import { PropTypes } from 'prop-types';
import { useDispatch } from 'react-redux';
import { finishGame } from './../../../store/game/actions';
import { ONE_SECONDS_IN_MS } from './../../../common/constants';

let timeStamp = 0;
function Savanna({ wordData }) {
	const dispatch = useDispatch();
	const words = wordData;
	const [currWordIndex, setCurrWordIndex] = useState(0);
	const [currWord, setCurrWord] = useState(null);
	const randomWordCount = 3;
	const [randomWords, setRandomWords] = useState(null);
	const [commonWords, setCommonWords] = useState(null);
	const [livesCount, setLivesCount] = useState(5);
	const [corrAnswersWords, setCorrAnswersWords] = useState([]);
	const [wrongAnswersWords, setWrongAnswersWords] = useState([]);
	const [isWordClicked, setIsWordClicked] = useState(false);
	const [currStreak, setCurrStreak] = useState(0);
	const [streakArr, setStreakArr] = useState([]);
	const [isGameEnd, setIsGameEnd] = useState(false);

	const maxLivesCount = 5;
	const lives = [...Array(maxLivesCount)].map((_, index) => {
		if (index < livesCount) {
			return <FaHeart key={index} className={classes.redHeart} />;
		} else {
			return <FaRegHeart key={index} className={classes.heart} />;
		}
	});

	useEffect(() => {
		if (isGameEnd && (corrAnswersWords.includes(currWord) || wrongAnswersWords.includes(currWord))) {
			const resWords = words.map((el) => el.word);
			const maxStreak = max(streakArr);

			dispatch(
				finishGame({
					correct: corrAnswersWords,
					wrong: wrongAnswersWords,
					maxStreak,
					resWords,
				})
			);
		}
	}, [corrAnswersWords, wrongAnswersWords, isGameEnd]);

	useEffect(() => {
		if (words) {
			// set 3 random
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
		// if lives=0 then game over
		if (!livesCount) {
			setIsGameEnd(true);
		}
	}, [livesCount]);

	function handleWrongWordClick() {
		checkEndWords();

		setTimeout(() => {
			setCurrWordIndex(currWordIndex + 1);
		}, 500);
		setWrongAnswersWords([...wrongAnswersWords, currWord]);
		setLivesCount(livesCount - 1);
		setIsWordClicked(true);

		playWrong();

		setStreakArr([...streakArr, currStreak]);
		setCurrStreak(0);
	}

	function handleCorrectWordClick() {
		checkEndWords();

		// go to next word
		setTimeout(() => {
			setCurrWordIndex(currWordIndex + 1);
		}, 500);
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

	const keysStr = '1,2,3,4';

	useHotkeys(
		keysStr,
		(e) => {
			if (e.timeStamp - timeStamp > ONE_SECONDS_IN_MS) {
				timeStamp = e.timeStamp;
				keyHandler(e);
			}
		},
		[commonWords, currWord, isWordClicked]
	);

	function keyHandler(e) {
		if (commonWords) {
			// e.key-1 coz we press 1, but array index starts with 0
			if (commonWords[e.key - 1] === currWord) {
				handleCorrectWordClick();
			} else {
				handleWrongWordClick();
			}
		}
	}

	useEffect(() => {}, [timeStamp]);

	const animation = useSpring({
		config: { duration: 3000 },
		from: { top: 70 },
		to: { top: 400 },
		reset: true,
		onRest: handleWrongWordClick,
	});

	return (
		<div className={classes.savanna} fullscreen="true">
			<div className={classes.lives}>{lives.reverse()}</div>
			{currWord && (
				<>
					<animated.h3 style={animation} className={classes.currWord}>
						{currWord.word}
					</animated.h3>
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
				</>
			)}
		</div>
	);
}

Savanna.propTypes = {
	wordData: PropTypes.array,
};

export default Savanna;
