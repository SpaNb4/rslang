import React, { useState, useEffect, useRef } from 'react';
import shuffle from 'lodash/shuffle';
import sampleSize from 'lodash/sampleSize';
import { useHotkeys } from 'react-hotkeys-hook';
import { AiFillSound } from 'react-icons/ai';
import { ExternalUrls } from '../../../common/constants';
import { useDispatch } from 'react-redux';
import classes from './AudioGame.module.scss';
import { playWrong, playCorrect } from '../../../common/helpers';
import { PropTypes } from 'prop-types';
import { finishGame } from './../../../store/game/actions';

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
	const audioRef = useRef(null);

	const randomWordCount = 4;

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
	}

	function handleCorrectWordClick() {
		checkEndWords();

		// go to next word
		setCorrAnswersWords([...corrAnswersWords, currWord]);
		setIsWordClicked(true);

		playCorrect();
	}

	function checkEndWords() {
		if (currWordIndex === words.length - 1) {
			dispatch(
				finishGame({
					correct: corrAnswersWords,
					wrong: wrongAnswersWords,
				})
			);
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
					<button
						className={classes.btn}
						onClick={() => nextClickHandler({ target: audioRef.current }, currWord)}
					>
						{isWordClicked ? 'Далее' : 'Не знаю'}
					</button>
				</>
			)}
		</div>
	);
}

AudioGame.propTypes = {
	wordData: PropTypes.array,
};

export default AudioGame;
