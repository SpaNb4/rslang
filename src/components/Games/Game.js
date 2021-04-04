import React, { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { setUserWord, updateUserWord } from '../../store/dictionary/actions';
import { updateGame } from '../../store/game/actions';
import { fetchAggregatedWords, fetchWords } from '../../store/book/actions';
import { getAnswers, getGameOver } from '../../store/game/slices';
import { getAggregatedWords } from '../../store/book/slices';
import { getUserId, getToken, getAuthorized } from '../../store/app/slices';

import Loader from '../Loader/Loader';
import GameIntro from './GameIntro/GameIntro';
import GameStats from './GameStats/GameStats';
import GameOverLay from './GameOverlay/GameOverlay';
import AudioGame from './AudioGame/AudioGame';
import Kit from './Kit/Kit';
import Savanna from './Savanna/Savanna';
import GameSprint from './GameSprint/GameSprint';

import { DictionarySections, LocalStorageKeys, menu } from '../../common/constants';
import { updateData } from '../../common/helpers';

import classes from './Game.module.scss';

const Game = () => {
	const dispatch = useDispatch();
	const { pathname } = useLocation();
	const userId = useSelector(getUserId);
	const authorized = useSelector(getAuthorized);
	const token = useSelector(getToken);
	const aggregatedWords = useSelector(getAggregatedWords);
	const gameOver = useSelector(getGameOver);
	const answers = useSelector(getAnswers);
	const filterRules = JSON.stringify({
		$or: [
			{ 'userWord.difficulty': DictionarySections.Hard },
			{ 'userWord.difficulty': DictionarySections.Trained },
			{ userWord: null },
		],
	});
	const { linkName, linkId, rules } = menu.games.find((elem) => pathname.includes(elem.linkId));

	useEffect(() => dispatch(updateGame(linkId)), [linkId]);

	useEffect(() => {
		if (authorized) {
			dispatch(fetchAggregatedWords(null, null, userId, token, filterRules));
		} else {
			dispatch(fetchWords(null, null));
		}
	}, [authorized, userId, token]);

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

		if (gameOver) {
			const name = userId || LocalStorageKeys.userStats;
			const statsData = JSON.parse(localStorage.getItem(name)) || null;
			const totalStatsData = statsData ? updateData(statsData, newStatsData) : [newStatsData];

			localStorage.setItem(name, JSON.stringify(totalStatsData));

			// update word stats:
			answers.correct.forEach((word) => {
				const { wordDifficulty } = word;

				if (wordDifficulty) {
					dispatch(updateUserWord(userId, token, word, wordDifficulty, 1));
				} else {
					dispatch(setUserWord(userId, token, word, DictionarySections.Trained, 1));
					// updateStats
				}
			});

			answers.wrong.forEach((word) => {
				const { wordDifficulty } = word;

				if (wordDifficulty) {
					dispatch(updateUserWord(userId, token, word, wordDifficulty, 0, 1));
				} else {
					dispatch(setUserWord(userId, token, word, DictionarySections.Trained, 0, 1));
				}
			});
		}
	}, [gameOver]);

	return (
		<main className={classes.root}>
			{gameOver ? (
				<GameStats corrAnswersWords={answers.correct} wrongAnswersWords={answers.wrong} />
			) : aggregatedWords.length ? (
				<>
					<GameIntro name={linkName} settings={pathname.includes('true')} rules={rules} />
					<GameOverLay> {renderGame(aggregatedWords)} </GameOverLay>
				</>
			) : (
				<Loader />
			)}
		</main>
	);
};

export default Game;
