// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';

import { useDispatch } from 'react-redux';
import { useHotkeys } from 'react-hotkeys-hook';
import Timer from './Timer';
import shuffle from 'lodash/shuffle';
import map from 'lodash/map';

import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { FaVolumeUp } from 'react-icons/fa';

import { buildUrl } from '../../../common/helpers';
import { ExternalUrls } from '../../../common/constants';
import { finishGame } from '../../../store/game/actions';

import zoidberg from '../../../assets/images/zoidberg.png';
import professor from '../../../assets/images/professor.png';
import bender from '../../../assets/images/bender.png';
import leela from '../../../assets/images/leela.png';
import ship from '../../../assets/images/ship.png';

import { playWrong, playCorrect } from '../../../common/helpers';

import classes from './GameSprint.module.scss';

const numberOfShips = 3;
const numbersOfHeroes = 3;
const heroImages = [zoidberg, professor, leela, bender];

export function streakToShips(streak) {
	return streak % (numberOfShips + 1);
}

export function streakToHeroes(streak) {
	return Math.min(numbersOfHeroes, Math.floor(streak / (numberOfShips + 1)));
}

function GameSprint({ wordData }) {
	const dispatch = useDispatch();
	const [result, setResult] = useState(null);
	const [objectWordData, setObjectWordData] = useState([]);
	const [corrAnswersWords, setCorrAnswersWords] = useState([]);
	const [wrongAnswersWords, setWrongAnswersWords] = useState([]);
	const [wordIndices, setWordIndices] = useState(shuffle(Array.from(Array(wordData.length).keys())));
	const [currentStreak, setCurrentStreak] = useState(0);
	const [maxStreak, setMaxStreak] = useState(0);

	if (!objectWordData) {
		generateObjectWordData();
	}

	useEffect(() => {
		if (wordData.length) {
			generateObjectWordData();
		}
	}, [wordData]);

	function onClickButtonValid() {
		if (objectWordData.showValidPair) {
			setResult(true);
			setCorrAnswersWords([...corrAnswersWords, objectWordData.word]);
			const nextStreak = currentStreak + 1;
			setCurrentStreak(nextStreak);
			setMaxStreak(Math.max(maxStreak, nextStreak));
			playCorrect();
		} else {
			setResult(false);
			setWrongAnswersWords([...wrongAnswersWords, objectWordData.word]);
			setCurrentStreak(0);
			playWrong();
		}
		setObjectWordData(null);
	}
	function onClickButtonInvalid() {
		if (!objectWordData.showValidPair) {
			setResult(true);
			setCorrAnswersWords([...corrAnswersWords, objectWordData.word]);
			const nextStreak = currentStreak + 1;
			setCurrentStreak(nextStreak);
			setMaxStreak(Math.max(maxStreak, nextStreak));
			playCorrect();
		} else {
			setResult(false);
			setWrongAnswersWords([...wrongAnswersWords, objectWordData.word]);
			setCurrentStreak(0);
			playWrong();
		}
		setObjectWordData(null);
	}

	function generateObjectWordData() {
		if (wordIndices.length === 0) {
			handleGameOver();
			return;
		}
		let wordIndex = wordIndices[wordIndices.length - 1];
		wordIndices.pop();
		setWordIndices(wordIndices);
		const showValidPair = Math.random() < 0.5;
		const currentWord = wordData[wordIndex].word;
		let currentWordTranslation;
		if (showValidPair) {
			currentWordTranslation = wordData[wordIndex].wordTranslate;
		} else {
			let invalidWordIndex = Math.floor(Math.random() * (wordData.length - 1));
			if (invalidWordIndex === wordIndex) {
				invalidWordIndex = invalidWordIndex + 1;
			}
			currentWordTranslation = wordData[invalidWordIndex].wordTranslate;
		}
		setObjectWordData({
			currentWord: currentWord,
			currentWordTranslation: currentWordTranslation,
			showValidPair: showValidPair,
			word: wordData[wordIndex],
		});
	}

	function handleGameOver() {
		dispatch(
			finishGame({
				correct: corrAnswersWords,
				wrong: wrongAnswersWords,
				streak: maxStreak,
				words: map(wordData, 'word'),
			})
		);
	}

	function handlePlaySound() {
		if (objectWordData) {
			const a = new Audio(buildUrl(ExternalUrls.Root, objectWordData.word.audio));
			a.play();
		}
	}
	useHotkeys(
		'left',
		function (e) {
			if (!e.repeat) {
				onClickButtonInvalid();
			}
		},
		[objectWordData]
	);
	useHotkeys(
		'right',
		function (e) {
			if (!e.repeat) {
				onClickButtonValid();
			}
		},
		[objectWordData]
	);

	const currentHeroes = streakToHeroes(currentStreak);
	const currentShips = currentHeroes < numbersOfHeroes ? streakToShips(currentStreak) : numberOfShips;

	return (
		objectWordData !== null && (
			<div className={classes.position}>
				<Timer onTimeout={handleGameOver} />
				<div className={classes.sprint}>
					{result !== null && (result ? <div>Ура!</div> : <div>Упс, ошибка</div>)}
					{result === null && <div>Удачи!</div>}
					<div className={classes.border}>
						<div className={classes.iconposition}>
							{[...Array(numberOfShips).keys()].map((i) => {
								return (
									<img
										key={i}
										src={ship}
										alt="ship"
										className={i < currentShips ? classes.icon : classes.icon_hidden}
									/>
								);
							})}
						</div>
						<div className={classes.imgposition}>
							{[...Array(heroImages.length).keys()].map((i) => {
								return (
									<img
										key={i}
										src={heroImages[i]}
										alt="image"
										className={i < currentHeroes + 1 ? classes.img : classes.img_hidden}
									/>
								);
							})}
						</div>
						<button type="button" className={classes.buttonaudio} onClick={handlePlaySound}>
							<FaVolumeUp />
						</button>
						<div>{objectWordData.currentWord}</div>
						<div>{objectWordData.currentWordTranslation}</div>
						<div className={classes.buttoncontainer}>
							<div className={classes.buttoninvalid} onClick={onClickButtonInvalid}>
								Неверно
							</div>
							<div className={classes.buttonvalid} onClick={onClickButtonValid}>
								Верно
							</div>
						</div>
						<div className={classes.buttonArrow}>
							<BsArrowLeft className={classes.arrow} onClick={onClickButtonInvalid}></BsArrowLeft>
							<BsArrowRight className={classes.arrow} onClick={onClickButtonValid}></BsArrowRight>
						</div>
					</div>
				</div>
			</div>
		)
	);
}

GameSprint.propTypes = {
	wordData: PropTypes.array,
};

export default GameSprint;
