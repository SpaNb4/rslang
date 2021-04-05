// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';

import { useDispatch } from 'react-redux';
import { useHotkeys } from 'react-hotkeys-hook';
import Timer from './Timer';
import shuffle from 'lodash/shuffle';

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

function GameSprint({ wordData }) {
	const dispatch = useDispatch();
	const [result, setResult] = useState(null);
	const [objectWordData, setObjectWordData] = useState([]);
	const [corrAnswersWords, setCorrAnswersWords] = useState([]);
	const [wrongAnswersWords, setWrongAnswersWords] = useState([]);
	const [wordIndices, setWordIndices] = useState(shuffle(Array.from(Array(wordData.length).keys())));

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
			playCorrect();
		} else {
			setResult(false);
			setWrongAnswersWords([...wrongAnswersWords, objectWordData.word]);
			playWrong();
		}
		setObjectWordData(null);
	}
	function onClickButtonInvalid() {
		if (!objectWordData.showValidPair) {
			setResult(true);
			setCorrAnswersWords([...corrAnswersWords, objectWordData.word]);
			playCorrect();
		} else {
			setResult(false);
			setWrongAnswersWords([...wrongAnswersWords, objectWordData.word]);
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
				streak: 0,
				words: corrAnswersWords.concat(wrongAnswersWords),
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
		function () {
			onClickButtonInvalid();
		},
		[objectWordData]
	);
	useHotkeys(
		'right',
		function () {
			onClickButtonValid();
		},
		[objectWordData]
	);

	return (
		objectWordData !== null && (
			<div className={classes.position}>
				<Timer onTimeout={handleGameOver} />
				<div className={classes.sprint}>
					{result !== null && (result ? <div>Ура!</div> : <div>Упс, ошибка</div>)}
					{result === null && <div>Удачи!</div>}
					<div className={classes.border}>
						<div className={classes.iconposition}>
							<img src={ship} alt="ship" className={classes.icon} />
							<img src={ship} alt="ship" className={classes.icon} />
							<img src={ship} alt="ship" className={classes.icon} />
						</div>
						<div className={classes.imgposition}>
							<img src={zoidberg} alt="zoidberg" className={classes.img} />
							<img src={professor} alt="professor" className={classes.img} />
							<img src={leela} alt="leela" className={classes.img} />
							<img src={bender} alt="bender" className={classes.img} />
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
