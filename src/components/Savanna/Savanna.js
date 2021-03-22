import React, { useState, useEffect } from 'react';
import shuffle from 'lodash/shuffle';
import sampleSize from 'lodash/sampleSize';
import { useSpring, animated } from 'react-spring';
import { useHotkeys } from 'react-hotkeys-hook';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { AiFillSound } from 'react-icons/ai';
import { ExternalUrls } from './../../common/constants';
import { useSelector } from 'react-redux';
import { getAllWords } from './../../store/book/slices';
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
	const [corrAnswersWords, setCorrAnswersWords] = useState([]);
	const [wrongAnswersWords, setWrongAnswersWords] = useState([]);
	const allWords = useSelector(getAllWords);

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
		checkEndWords();

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
		checkEndWords();

		if (!isGameOver) {
			// go to next word
			setCurrWordIndex(currWordIndex + 1);
			setCorrectAnswers(correctAnswers + 1);
			setCorrAnswersWords([...corrAnswersWords, currWord]);
		}
	}

	function checkEndWords() {
		if (currWordIndex === words.length - 1) {
			setIsGameOver(true);
		}
	}

	function soundClickHandler(word) {
		const sound = new Audio(`${ExternalUrls.Root}${word.audio}`);
		sound.play();
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
				<div className={classes.gameOver}>
					<h1 className={classes.heading}>Статистика игры</h1>
					<div className={classes.allWordsWrapper}>
						<div className={classes.correctAnswers}>
							<h3>
								Знаю - <span className={classes.correctWordCount}>{correctAnswers}</span>
							</h3>
							<ul>
								{corrAnswersWords.map((word, index) => {
									return (
										<li key={index}>
											<AiFillSound onClick={() => soundClickHandler(word)} /> {word.word} -{' '}
											{word.wordTranslate}
										</li>
									);
								})}
							</ul>
						</div>
						<hr />
						<div className={classes.wrongAnswers}>
							<h3>
								Ошибок - <span className={classes.wrongWordCount}>{wrongAnswers}</span>
							</h3>
							<ul>
								{wrongAnswersWords.map((word, index) => {
									return (
										<li key={index}>
											<AiFillSound onClick={() => soundClickHandler(word)} /> {word.word} -{' '}
											{word.wordTranslate}
										</li>
									);
								})}
							</ul>
						</div>
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
