import React, { useState, useEffect } from 'react';
import shuffle from 'lodash/shuffle';
import sampleSize from 'lodash/sampleSize';
import { useSelector } from 'react-redux';
import { getAllWords } from '../../../store/book/slices';
import GameStats from '../GameStats/GameStats';

import classes from './GameSprint.module.scss';

export default function GameSprint() {
	const [words, setWords] = useState(null);
	const [currWord, setCurrWord] = useState(null);
	const [currWordIndex, setCurrWordIndex] = useState(0);
	const [randomWords, setRandomWords] = useState(null);
	const [commonWords, setCommonWords] = useState(null);
	const [isGameOver, setIsGameOver] = useState(false);
	const [corrAnswersWords, setCorrAnswersWords] = useState([]);
	const [wrongAnswersWords, setWrongAnswersWords] = useState([]);
	const [isWordClicked, setIsWordClicked] = useState(false);
	const allWords = useSelector(getAllWords);

	const randomWordCount = 1;

	useEffect(() => {
		if (allWords.length) {
			setWords(allWords);
		}
	}, [allWords]);

	useEffect(() => {
		if (words) {
			setRandomWords(sampleSize(words, randomWordCount));
			setCurrWord(words[currWordIndex]);
		}
	}, [words]);

	useEffect(() => {
		if (randomWords) {
			const commonWords = [...randomWords, words[randomWordCount]];

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

	function handleWrongWordClick() {
		checkEndWords();

		if (!isGameOver) {
			setTimeout(() => {
				setCurrWordIndex(currWordIndex + 1);
			}, 500);
			setWrongAnswersWords([...wrongAnswersWords, currWord]);
			setIsWordClicked(true);
		}
	}

	function handleCorrectWordClick() {
		checkEndWords();

		if (!isGameOver) {
			setTimeout(() => {
				setCurrWordIndex(currWordIndex + 1);
			}, 500);
			setCorrAnswersWords([...corrAnswersWords, currWord]);
			setIsWordClicked(true);
		}
	}

	function checkEndWords() {
		if (currWordIndex === words.length - 1) {
			setIsGameOver(true);
		}
	}

	return (
		<div className={classes.sprint}>
			{isGameOver ? (
				<GameStats corrAnswersWords={corrAnswersWords} wrongAnswersWords={wrongAnswersWords} />
			) : (
				currWord && (
					<>
						<div> {currWord.word} </div>
						{words[Math.floor(Math.random() * words.length)].wordTranslate}
						{commonWords && (
							<div className={classes.wordList}>
								{commonWords.map((word, index) => {
									if (
										word.wordTranslate !== currWord.word.wordTranslate ||
										word.wordTranslate ===
											words[Math.floor(Math.random() * words.length)].wordTranslate
									) {
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
												{word.wordTranslate}
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
												{word.wordTranslate}
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
