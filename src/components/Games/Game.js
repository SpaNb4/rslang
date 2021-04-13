import React, { useState, useEffect, useCallback } from 'react';
import { PropTypes } from 'prop-types';

import { useLocation } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import { setUserWord, updateUserWord } from '../../store/dictionary/actions';
import { startGame, updateGame } from '../../store/game/actions';
import { updateStatistics } from '../../store/statistics/actions';
import { fetchGameWords } from '../../store/book/actions';
import { getAnswers, getCurrentLevel, getGameOver, getGameStart } from '../../store/game/slices';
import { getToken, getUserId } from './../../store/app/slices';
import { getAllWords, getGameWords } from './../../store/book/slices';

import GameIntro from './GameIntro/GameIntro';
import GameStats from './GameStats/GameStats';
import GameOverLay from './GameOverlay/GameOverlay';
import AudioGame from './AudioGame/AudioGame';
import Kit from './Kit/Kit';
import Savanna from './Savanna/Savanna';
import GameSprint from './GameSprint/GameSprint';

import { LocalStorageKeys, menu, MIN_WORD_COUNT, DictionarySections } from '../../common/constants';
import { updateData } from '../../common/helpers';

import classes from './Game.module.scss';

import savannaImg from '../../assets/images/savannaImg.png';
import conImg from '../../assets/images/conImg.png';
import sprintImg from '../../assets/images/sprintImg.png';
import audioImg from '../../assets/images/audioImg.jpg';

const Game = (props) => {
	const dispatch = useDispatch();
	const { pathname } = useLocation();
	const prevPageWords = useSelector(getGameWords);
	const allWords = useSelector(getAllWords);
	const [words, setWords] = useState([]);
	const [isEnoughWords, setIsEnoughWords] = useState(true);
	const gameOver = useSelector(getGameOver);
	const isGameStart = useSelector(getGameStart);
	const level = useSelector(getCurrentLevel);
	const answers = useSelector(getAnswers);
	const userId = useSelector(getUserId);
	const token = useSelector(getToken);
	const propsState = props.location.state;
	const { linkName, linkId, rules } = menu.games.find((elem) => pathname.includes(elem.linkId));
	const filterRules = JSON.stringify({
		$or: [
			{ 'userWord.difficulty': DictionarySections.Hard },
			{ 'userWord.difficulty': DictionarySections.Trained },
			{ userWord: null },
		],
	});
	const [tmpWords, setTmpWords] = useState(propsState ? propsState.words : null);
	const [tmpPageCount, setTmpPageCount] = useState(2);

	useEffect(() => {
		if (propsState && propsState.words.length < MIN_WORD_COUNT) {
			// not 0 page and words<=5, get words from prev page
			if (propsState.page !== 0) {
				dispatch(fetchGameWords(propsState.group, propsState.page - 1, userId, token, filterRules));
			}
			// 0 page, can't get words from pre page, show message
			else if (propsState.page === 0) {
				setIsEnoughWords(false);
			}
		} else {
			// just from book or vocabulary
			if (propsState) {
				setWords(propsState.words);
			}
		}
	}, [words]);

	useEffect(() => {
		// from menu
		if (!propsState && allWords.length) {
			setWords(allWords);
		}
	}, [allWords]);

	useEffect(() => {
		if (propsState && tmpWords.length < MIN_WORD_COUNT) {
			dispatch(fetchGameWords(propsState.group, propsState.page - tmpPageCount, userId, token, filterRules));
			setTmpPageCount(tmpPageCount + 1);
			setTmpWords([...tmpWords, ...prevPageWords]);
		}
	}, [prevPageWords]);

	useEffect(() => {
		if (propsState && tmpWords.length > MIN_WORD_COUNT) {
			setWords(tmpWords);
		}
	}, [tmpWords]);

	useEffect(() => {
		if (!isGameStart && words.length && level !== null) {
			dispatch(startGame());
		}
	}, [words, level]);

	useEffect(() => {
		if (linkId) {
			setWords([]);
			dispatch(updateGame(linkId));
		}
	}, [pathname, linkId]);

	const renderGame = useCallback(
		(data) => {
			switch (linkName) {
				case 'Аудиовызов':
					return <AudioGame wordData={data} />;
				case 'Конструктор':
					return <Kit wordData={data} />;
				case 'Саванна':
					return <Savanna wordData={data} />;
				case 'Спринт':
					return <GameSprint wordData={data} />;
			}
		},
		[linkId]
	);
	const makeBackground = useCallback(() => {
		switch (linkName) {
			case 'Аудиовызов':
				return audioImg;
			case 'Конструктор':
				return conImg;
			case 'Саванна':
				return savannaImg;
			case 'Спринт':
				return sprintImg;
		}
	}, [linkId]);

	useEffect(() => {
		const newStatsData = {
			name: linkId,
			correct: answers.correct.length,
			wrong: answers.wrong.length,
			streak: answers.streak,
			words: answers.words,
		};

		if (gameOver) {
			const name = userId || LocalStorageKeys.userStats;
			const statsData = JSON.parse(localStorage.getItem(name)) || null;

			const totalStatsData = statsData ? updateData(statsData, newStatsData) : [newStatsData];

			localStorage.setItem(name, JSON.stringify(totalStatsData));

			// update word stats:

			if (userId) {
				answers.correct.forEach((word) => {
					const { wordDifficulty } = word;
					if (wordDifficulty) {
						dispatch(updateUserWord(userId, token, word, wordDifficulty, linkId, 1));
					} else {
						dispatch(setUserWord(userId, token, word, DictionarySections.Trained, linkId, 1));
						dispatch(updateStatistics(userId, token, { learnedWords: 1 }));
					}
				});

				answers.wrong.forEach((word) => {
					const { wordDifficulty } = word;

					if (wordDifficulty) {
						dispatch(updateUserWord(userId, token, word, wordDifficulty, linkId, 0, 1));
					} else {
						dispatch(setUserWord(userId, token, word, DictionarySections.Trained, linkId, 0, 1));
						dispatch(updateStatistics(userId, token, { learnedWords: 1 }));
					}
				});
			}
		}
	}, [gameOver]);

	return (
		<main className={classes.root}>
			{isEnoughWords ? (
				gameOver ? (
					<GameStats corrAnswersWords={answers.correct} wrongAnswersWords={answers.wrong} />
				) : (
					<>
						{isGameStart ? (
							<GameOverLay backgroundUrl={makeBackground()}> {renderGame(words)} </GameOverLay>
						) : (
							<GameIntro name={linkName} settings={pathname.includes('true')} rules={rules} />
						)}
					</>
				)
			) : (
				<div className={classes.noWordsContainer}>
					<h2>Недостаточно слов для игры :(</h2>
				</div>
			)}
		</main>
	);
};

Game.propTypes = {
	location: PropTypes.object,
};

export default Game;
