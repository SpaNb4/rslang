import React, { useState, useEffect, useRef } from 'react';
import shuffle from 'lodash/shuffle';
import sampleSize from 'lodash/sampleSize';
import { useHotkeys } from 'react-hotkeys-hook';
import { AiFillSound } from 'react-icons/ai';
import { ExternalUrls } from '../../../common/constants';
import { useSelector } from 'react-redux';
import { getAllWords } from '../../../store/book/slices';
import classes from './AudioGame.module.scss';

import correctSound from '../../../assets/audio/correctAnswer.wav';
import wrongSound from '../../../assets/audio/wrongAnswer.wav';
import GameStats from '../GameStats/GameStats';
import { playSound } from './../../../common/utils';
import GameContainer from '../GameContainer/GameContainer';

export default function AudioGame() {
	const [words, setWords] = useState(null);
	const [currWord, setCurrWord] = useState(null);
	const [currWordIndex, setCurrWordIndex] = useState(0);
	const [randomWords, setRandomWords] = useState(null);
	const [commonWords, setCommonWords] = useState(null);
	const [isGameOver, setIsGameOver] = useState(false);
	const [corrAnswersWords, setCorrAnswersWords] = useState([]);
	const [wrongAnswersWords, setWrongAnswersWords] = useState([]);
	const [isWordClicked, setIsWordClicked] = useState(false);
	const audioRef = useRef(null);
	const allWords = useSelector(getAllWords);

	const randomWordCount = 4;

	useEffect(() => {
		if (allWords.length) {
			setWords(allWords);
		}
	}, [allWords]);

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

		if (!isGameOver) {
			setWrongAnswersWords([...wrongAnswersWords, currWord]);
			setIsWordClicked(true);

			playSound(wrongSound);
		}
	}

	function handleCorrectWordClick() {
		checkEndWords();

		if (!isGameOver) {
			// go to next word
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

	function audioClickHandler(e, word) {
		const sound = new Audio(`${ExternalUrls.Main}${word.audio}`);
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

	return (
		<GameContainer>
			<div className={classes.audioGame}>
				{isGameOver ? (
					<GameStats corrAnswersWords={corrAnswersWords} wrongAnswersWords={wrongAnswersWords} />
				) : (
					currWord && (
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
										<img src={`${ExternalUrls.Main}` + currWord.image} />
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
							<button
								className={classes.btn}
								onClick={() => nextClickHandler({ target: audioRef.current }, currWord)}
							>
								{isWordClicked ? 'Далее' : 'Не знаю'}
							</button>
						</>
					)
				)}
			</div>
		</GameContainer>
	);
}
