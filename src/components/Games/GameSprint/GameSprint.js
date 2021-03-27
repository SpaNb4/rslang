import React, { useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { BsArrowRight } from 'react-icons/bs';
import { useHotkeys } from 'react-hotkeys-hook';
//import shuffle from 'lodash/shuffle';
//import sampleSize from 'lodash/sampleSize';
//import { useSelector } from 'react-redux';
//import { getAllWords } from '../../../store/book/slices';
//import GameStats from '../GameStats/GameStats';

import { PropTypes } from 'prop-types';
import Timer from './Timer';

import classes from './GameSprint.module.scss';

export default function GameSprint({ wordData }) {
	const [result, setResult] = useState(null);
	const [objectWordData, setObjectWordData] = useState(null);
	const [over, setOver] = useState(false);

	if (objectWordData === null) {
		generateObjectWordData();
	}

	function onClickButtonValid() {
		if (objectWordData.showValidPair) {
			setResult(true);
		} else {
			setResult(false);
		}
		generateObjectWordData();
	}
	function onClickButtonInvalid() {
		if (!objectWordData.showValidPair) {
			setResult(true);
		} else {
			setResult(false);
		}
		generateObjectWordData();
	}

	function generateObjectWordData() {
		let wordIndex = Math.floor(Math.random() * wordData.length);
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
		});
	}

	function handleTimeout() {
		setOver(true);
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

	let innerContent;
	if (!over) {
		innerContent = objectWordData !== null && (
			<div className={classes.sprint}>
				<Timer onTimeout={handleTimeout} />
				<div>{objectWordData.currentWord}</div>
				<div>{objectWordData.currentWordTranslation}</div>
				<div className={classes.buttoncontainer}>
					<div className={classes.button} onClick={onClickButtonInvalid}>
						Неверно
					</div>
					<div className={classes.button} onClick={onClickButtonValid}>
						Верно
					</div>
				</div>
				<div className={classes.buttonArrow}>
					<BsArrowLeft className={classes.arrow}></BsArrowLeft>
					<BsArrowRight className={classes.arrow}></BsArrowRight>
				</div>
				{result !== null && (result ? <div>Ура!</div> : <div>Ошибка</div>)}
			</div>
		);
	} else {
		innerContent = <div className={classes.sprint}>Вы молодец! Игра окончена.</div>;
	}

	return innerContent;
}

GameSprint.propTypes = {
	wordData: PropTypes.array,
};
