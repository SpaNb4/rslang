import React, { useState, useEffect } from 'react';
import shuffle from 'lodash/shuffle';
import sampleSize from 'lodash/sampleSize';
import { useSpring, animated } from 'react-spring';
import { useHotkeys } from 'react-hotkeys-hook';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { getAllWords } from '../../../store/book/slices';
import classes from './Savanna.module.scss';

import correctSound from '../../../assets/audio/correctAnswer.wav';
import wrongSound from '../../../assets/audio/wrongAnswer.wav';
import GameStats from '../GameStats/GameStats';
import { playSound } from './../../../common/utils';

export default function Savanna() {
	const [words, setWords] = useState(null);
	const [currWord, setCurrWord] = useState(null);
	const [currWordIndex, setCurrWordIndex] = useState(0);
	const [randomWords, setRandomWords] = useState(null);
	const [commonWords, setCommonWords] = useState(null);
	const [livesCount, setLivesCount] = useState(5);
	const [isGameOver, setIsGameOver] = useState(false);
	const [corrAnswersWords, setCorrAnswersWords] = useState([]);
	const [wrongAnswersWords, setWrongAnswersWords] = useState([]);
	const [isWordClicked, setIsWordClicked] = useState(false);
	const allWords = useSelector(getAllWords);

	const randomWordCount = 3;
	const maxLivesCount = 5;
	const lives = [...Array(maxLivesCount)].map((_, index) => {
		if (index < livesCount) {
			return <FaHeart key={index} className={classes.redHeart} />;
		} else {
			return <FaRegHeart key={index} className={classes.heart} />;
		}
	});

	useEffect(() => {
		if (allWords.length) {
			setWords(allWords);
		}
	}, [allWords]);

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
			setIsGameOver(true);
		}
	}, [livesCount]);

	function handleWrongWordClick() {
		checkEndWords();

		if (!isGameOver) {
			setTimeout(() => {
				setCurrWordIndex(currWordIndex + 1);
			}, 500);
			setWrongAnswersWords([...wrongAnswersWords, currWord]);
			setLivesCount(livesCount - 1);
			setIsWordClicked(true);

			playSound(wrongSound);
		}
	}

	function handleCorrectWordClick() {
		checkEndWords();

		if (!isGameOver) {
			// go to next word
			setTimeout(() => {
				setCurrWordIndex(currWordIndex + 1);
			}, 500);
			setCorrAnswersWords([...corrAnswersWords, currWord]);
			setIsWordClicked(true);

			playSound(correctSound);
		}
	}

	function checkEndWords() {
		if (currWordIndex === words.length - 1) {
			setIsGameOver(true);
		}
	}

	const keysStr = '1,2,3,4';

	useHotkeys(
		keysStr,
		(e) => {
			keyHandler(e);
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

	const animation = useSpring({
		config: { duration: 3000 },
		from: { top: 0 },
		to: { top: 200 },
		reset: true,
		onRest: handleWrongWordClick,
	});

	return (
		<div className={classes.savanna}>
			<div className={classes.lives}>{lives.reverse()}</div>
			{isGameOver ? (
				<GameStats corrAnswersWords={corrAnswersWords} wrongAnswersWords={wrongAnswersWords} />
			) : (
				currWord && (
					<>
						<animated.h3 style={animation} className={classes.currWord}>
							{currWord.word}
						</animated.h3>
						{commonWords && (
							<div className={classes.wordList}>
								{commonWords.map((word, index) => {
									if (word === currWord) {
										return (
											<div
												className={
													isWordClicked
														? [classes.wordListItem, classes.correctWord].join(' ')
														: classes.wordListItem
												}
												key={index}
												onClick={handleCorrectWordClick}
											>
												<span>{index + 1}</span> {word.wordTranslate}
											</div>
										);
									} else {
										return (
											<div
												className={
													isWordClicked
														? [classes.wordListItem, classes.wrongWord].join(' ')
														: classes.wordListItem
												}
												key={index}
												onClick={handleWrongWordClick}
											>
												<span>{index + 1}</span> {word.wordTranslate}
											</div>
										);
									}
								})}
							</div>
						)}
					</>
				)
			)}
		</div>
	);
}
