import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { getAnswers, getGameOver } from '../../store/game/slices';
import GameIntro from './GameIntro/GameIntro';
import GameStats from './GameStats/GameStats';
import GameOverLay from './GameOverlay/GameOverlay';
import AudioGame from './AudioGame/AudioGame';
import Kit from './Kit/Kit';
import Savanna from './Savanna/Savanna';
import GameSprint from './GameSprint/GameSprint';
import { menu } from '../../common/constants';
import classes from './Game.module.scss';
import { PropTypes } from 'prop-types';
import { MIN_WORD_COUNT } from './../../common/constants';
import { getToken, getUserId } from './../../store/app/slices';
import { fetchAggregatedWords } from '../../store/book/actions';
import { getAggregatedWords } from './../../store/book/slices';
import { updateGame } from '../../store/game/actions';
import { getGameStart, getCurrentLevel } from './../../store/game/slices';
import random from 'lodash/random';

const Game = (props) => {
	const dispatch = useDispatch();
	const { pathname } = useLocation();
	const prevPageWords = useSelector(getAggregatedWords);
	const [words, setWords] = useState([]);
	const [isEnoughWords, setIsEnoughWords] = useState(true);
	const gameOver = useSelector(getGameOver);
	const isGameStart = useSelector(getGameStart);
	const answers = useSelector(getAnswers);
	const userId = useSelector(getUserId);
	const token = useSelector(getToken);
	const level = useSelector(getCurrentLevel);
	const levelWords = useSelector(getAggregatedWords);
	const propsState = props.location.state;
	const { linkName, linkId, rules } = menu.games.find((elem) => pathname.includes(elem.linkId));

	useEffect(() => {
		// from book or vocabulary and words <= 5
		if (propsState && isGameStart && propsState.words.length <= MIN_WORD_COUNT) {
			setWords([...prevPageWords, ...propsState.words]);
		}
		// just from book or vocabulary
		else if (propsState && isGameStart) {
			setWords(propsState.words);
		}
		// from menu
		else {
			dispatch(fetchAggregatedWords(level, random(0, 29), userId, token));
		}
	}, [isGameStart]);

	useEffect(() => {
		// not 0 page and words<=5, get words from prev page
		if (propsState && propsState.page !== 0 && propsState.words.length <= MIN_WORD_COUNT) {
			dispatch(fetchAggregatedWords(null, propsState.page - 1, userId, token));
		}
		// 0 page, can't get words from pre page, show message
		else if (propsState && propsState.page === 0 && propsState.words.length <= MIN_WORD_COUNT) {
			setIsEnoughWords(false);
		}
	}, []);

	useEffect(() => {
		// set words when we click from menu
		setWords(levelWords);
	}, [levelWords]);

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
				<h2>Недостаточно слов для игры :(</h2>
			)}
		</main>
	);
};

Game.propTypes = {
	location: PropTypes.object,
};

export default Game;
