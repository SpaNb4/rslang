import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { getAnswers, getCurrentLevel, getGameOver } from '../../store/game/slices';
import GameIntro from './GameIntro/GameIntro';
import GameStats from './GameStats/GameStats';
import GameOverLay from './GameOverlay/GameOverlay';
import AudioGame from './AudioGame/AudioGame';
import Kit from './Kit/Kit';
import Savanna from './Savanna/Savanna';
import GameSprint from './GameSprint/GameSprint';
import { LocalStorageKeys, menu } from '../../common/constants';
import _ from 'lodash';
import classes from './Game.module.scss';
import { PropTypes } from 'prop-types';
import { MIN_WORD_COUNT, DictionarySections } from './../../common/constants';
import { getToken, getUserId } from './../../store/app/slices';
import { fetchGameWords } from '../../store/book/actions';
import { getAllWords, getGameWords } from './../../store/book/slices';
import { updateGame } from '../../store/game/actions';
import { getGameStart } from './../../store/game/slices';
import { startGame } from './../../store/game/actions';

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
	const [tmpWords, setTmpWords] = useState(propsState.words);
	const [tmpPageCount, setTmpPageCount] = useState(2);

	useEffect(() => {
		if (propsState && propsState.words.length <= MIN_WORD_COUNT) {
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
			// from menu
			else if (!propsState) {
				setWords(allWords);
			}
		}
	}, []);

	useEffect(() => {
		if (tmpWords.length <= MIN_WORD_COUNT) {
			dispatch(fetchGameWords(propsState.group, propsState.page - tmpPageCount, userId, token, filterRules));
			setTmpPageCount(tmpPageCount + 1);
			setTmpWords([...tmpWords, ...prevPageWords]);
		}
	}, [prevPageWords]);

	useEffect(() => {
		if (tmpWords.length >= MIN_WORD_COUNT) {
			setWords(tmpWords);
		}
	}, [tmpWords]);

	useEffect(() => {
		if (!isGameStart && words.length && level !== null) {
			dispatch(startGame());
		}
	}, [words, level]);

	useEffect(() => dispatch(updateGame(linkId)), [linkId]);

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

	useEffect(() => {
		const newStatsData = {
			name: linkId,
			correct: answers.correct.length,
			wrong: answers.wrong.length,
			streak: answers.streak,
			words: answers.words,
		};

		const updateData = (prev, curr) => {
			const index = _.findIndex(prev, { name: curr.name });

			if (index >= 0) {
				prev[index].correct += curr.correct;
				prev[index].wrong += curr.wrong;
				prev[index].streak = _.max([prev[index].streak, curr.streak]);
				prev[index].words = _.uniq([...prev[index].words, ...curr.words]);
			} else {
				prev.push(curr);
			}

			return prev;
		};

		if (gameOver) {
			const name = userId || LocalStorageKeys.userStats;
			const statsData = JSON.parse(localStorage.getItem(name)) || null;
			console.log(statsData);
			const totalStatsData = statsData ? updateData(statsData, newStatsData) : [newStatsData];

			localStorage.setItem(name, JSON.stringify(totalStatsData));
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
							<GameOverLay> {renderGame(words)} </GameOverLay>
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
