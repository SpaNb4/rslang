import React, { useState } from 'react';
//import shuffle from 'lodash/shuffle';
//import sampleSize from 'lodash/sampleSize';
//import { useSelector } from 'react-redux';
//import { getAllWords } from '../../../store/book/slices';
//import GameStats from '../GameStats/GameStats';
import { PropTypes } from 'prop-types';

import classes from './GameSprint.module.scss';

export default function GameSprint({ wordData }) {
	const [result, setResult] = useState(null);
	const [objectWordData, setObjectWordData] = useState(null);

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

	return (
		objectWordData !== null && (
			<div className={classes.GameSprint}>
				<div>{objectWordData.currentWord}</div>
				<div>{objectWordData.currentWordTranslation}</div>
				<div className={classes.button}>
					<button onClick={onClickButtonValid}>Верно</button>
					<button onClick={onClickButtonInvalid}>Неверно</button>
					{result !== null && (result ? <div>Ура!</div> : <div>nope</div>)}
				</div>
			</div>
		)
	);
}

GameSprint.propTypes = {
	wordData: PropTypes.array,
};
