import React, { useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { BsArrowRight } from 'react-icons/bs';
import { useHotkeys } from 'react-hotkeys-hook';
import GameStats from '../GameStats/GameStats';
import { buildUrl } from '../../../common/helpers';
import { ExternalUrls } from '../../../common/constants';
import { PropTypes } from 'prop-types';
import Timer from './Timer';
import { FaVolumeUp } from 'react-icons/fa';
import classes from './GameSprint.module.scss';

function GameSprintMain({ wordData, onResult }) {
	const [result, setResult] = useState(null);
	const [objectWordData, setObjectWordData] = useState(null);
	const [corrAnswersWords, setCorrAnswersWords] = useState([]);
	const [wrongAnswersWords, setWrongAnswersWords] = useState([]);

	if (objectWordData === null) {
		generateObjectWordData();
	}

	function onClickButtonValid() {
		if (objectWordData.showValidPair) {
			setResult(true);
			setCorrAnswersWords([...corrAnswersWords, objectWordData.word]);
		} else {
			setResult(false);
			setWrongAnswersWords([...wrongAnswersWords, objectWordData.word]);
		}
		generateObjectWordData();
	}
	function onClickButtonInvalid() {
		if (!objectWordData.showValidPair) {
			setResult(true);
			setCorrAnswersWords([...corrAnswersWords, objectWordData.word]);
		} else {
			setResult(false);
			setWrongAnswersWords([...wrongAnswersWords, objectWordData.word]);
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
			word: wordData[wordIndex],
		});
	}

	function handleTimeout() {
		onResult([corrAnswersWords, wrongAnswersWords]);
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
			<div className={classes.color}>
				<Timer onTimeout={handleTimeout} />
				<div className={classes.sprint}>
					{result !== null && (result ? <div>Ура!</div> : <div>Упс, ошибка</div>)}
					{result === null && <div>Удачи!</div>}
					<div className={classes.border}>
						<button type="button" className={classes.buttonaudio} onClick={handlePlaySound}>
							<FaVolumeUp />
						</button>
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
					</div>
				</div>
			</div>
		)
	);
}

export default function GameSprint({ wordData }) {
	const [result, setResult] = useState(null);

	function handleResult(res) {
		setResult(res);
	}

	if (result === null) {
		return <GameSprintMain wordData={wordData} onResult={handleResult} />;
	} else {
		return (
			<div className={classes.sprint}>
				<GameStats corrAnswersWords={result[0]} wrongAnswersWords={result[1]} />
			</div>
		);
	}
}

GameSprint.propTypes = {
	wordData: PropTypes.array,
};
GameSprintMain.propTypes = {
	wordData: PropTypes.array,
	onResult: PropTypes.func,
};
