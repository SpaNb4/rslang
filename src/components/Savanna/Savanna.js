import React, { useState, useEffect } from 'react';
import axios from 'axios';
import shuffle from 'lodash/shuffle';
import sampleSize from 'lodash/sampleSize';
import { useSpring, animated } from 'react-spring';
import { useHotkeys } from 'react-hotkeys-hook';
import classes from './Savanna.module.scss';

export default function Savanna() {
	const [words, setWords] = useState(null);
	const [currWord, setCurrWord] = useState(null);
	const [currWordIndex, setCurrWordIndex] = useState(0);
	const [randomWords, setRandomWords] = useState(null);
	const [commonWords, setCommonWords] = useState(null);
	const [livesCount, setLivesCount] = useState(5);
	const [isGameOver, setIsGameOver] = useState(false);
	const [correctAnswers, setCorrectAnswers] = useState(0);
	const [wrongAnswers, setWrongAnswers] = useState(0);
	const [currAnswersWords, setCurrAnswersWords] = useState([]);
	const [wrongAnswersWords, setWrongAnswersWords] = useState([]);

	const lives = [...Array(5)].map((_, index) => {
		if (index < livesCount) {
			return <span key={index} className={classes.redHeart}></span>;
		} else {
			return <span key={index} className={classes.heart}></span>;
		}
	});

	useEffect(() => {
		axios.get(`https://afternoon-falls-25894.herokuapp.com/words`).then((res) => {
			setWords(res.data);
		});
	}, []);

	useEffect(() => {
		if (words) {
			// set 3 random
			setRandomWords(sampleSize(words, 3));
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
			setRandomWords(sampleSize(filteredArr, 3));
		}
	}, [currWordIndex]);

	useEffect(() => {
		// if lives=0 then game over
		if (!livesCount) {
			setIsGameOver(true);
		}
	}, [livesCount]);

	function handleWrongWordClick(e) {
		if (!isGameOver) {
			// if we use mouse click
			if (e && e.target) {
				setLivesCount(livesCount - 1);
				setWrongAnswers(wrongAnswers + 1);
				setWrongAnswersWords([...wrongAnswersWords, currWord]);
				// add visual style that it's wrong word
				e.target.classList.add(classes.wrongWord);

				setTimeout(() => {
					e.target.classList.remove(classes.wrongWord);
					setCurrWordIndex(currWordIndex + 1);
				}, 1000);
			}
			// key press
			// TODO: add classList
			else {
				setLivesCount(livesCount - 1);
				setCurrWordIndex(currWordIndex + 1);
				setWrongAnswers(wrongAnswers + 1);
				setWrongAnswersWords([...wrongAnswersWords, currWord]);
			}
		}
	}

	function handleCorrectWordClick() {
		if (!isGameOver) {
			// go to next word
			setCurrWordIndex(currWordIndex + 1);
			setCorrectAnswers(correctAnswers + 1);
			setCurrAnswersWords([...currAnswersWords, currWord]);
		}
	}

	const keysStr = '1,2,3,4';

	useHotkeys(
		keysStr,
		(e) => {
			keyHandler(e);
		},
		[commonWords, currWord]
	);

	function keyHandler(e) {
		// e.key-1 coz we press 1, but array index starts with 0
		if (commonWords[e.key - 1] === currWord) {
			handleCorrectWordClick();
		} else {
			handleWrongWordClick();
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
				<div>
					<h1>Game over</h1>
					<div>
						<h3>Correct Answers - {correctAnswers}</h3>
						<ul>
							{currAnswersWords.map((word, index) => {
								return (
									<li key={index}>
										{word.word} - {word.wordTranslate}
									</li>
								);
							})}
						</ul>
					</div>
					<div>
						<h3>Wrong Answers - {wrongAnswers}</h3>
						<ul>
							{wrongAnswersWords.map((word, index) => {
								return (
									<li key={index}>
										{word.word} - {word.wordTranslate}
									</li>
								);
							})}
						</ul>
					</div>
				</div>
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
												className={classes.wordListItem}
												key={index}
												onClick={handleCorrectWordClick}
											>
												<span>{index + 1}</span> {word.wordTranslate}
											</div>
										);
									} else {
										return (
											<div
												className={classes.wordListItem}
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
