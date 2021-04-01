/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { getAnswers, getGameOver } from '../../store/game/slices';

import Loader from '../Loader/Loader';
import GameIntro from './GameIntro/GameIntro';
import GameStats from './GameStats/GameStats';
import GameOverLay from './GameOverlay/GameOverlay';
import AudioGame from './AudioGame/AudioGame';
import Kit from './Kit/Kit';
import Savanna from './Savanna/Savanna';
import { menu } from '../../common/constants';
import classes from './Game.module.scss';
import { PropTypes } from 'prop-types';
import { MIN_WORD_COUNT } from './../../common/constants';
import { getToken, getUserId } from './../../store/app/slices';
import { fetchAggregatedWords } from '../../store/book/actions';
import { getAggregatedWordsWords } from './../../store/book/slices';

const Game = (props) => {
	const dispatch = useDispatch();
	const { pathname } = useLocation();
	// const prevPageWords = useSelector(getAggregatedWordsWords);
	// const currWords = props.location.state.words;
	const words = [];
	const gameOver = useSelector(getGameOver);
	const answers = useSelector(getAnswers);
	const userId = useSelector(getUserId);
	const token = useSelector(getToken);
	const { linkName, rules } = menu.games.find((elem) => pathname.includes(elem.linkId));

	// useEffect(() => {
	// 	if (prevPageWords.length >= MIN_WORD_COUNT) {
	// 		setIsGameStart(true);
	// 	}
	// }, [prevPageWords]);

	// useEffect(() => {
	// 	if (isGameStart) {
	// 		setWords([...prevPageWords, ...currWords]);
	// 	}
	// }, [isGameStart]);

	useEffect(() => {
		if (
			props.location.state &&
			props.location.state.page !== 0 &&
			props.location.state.words.length <= MIN_WORD_COUNT
		) {
			dispatch(fetchAggregatedWords(null, props.location.state.page - 1, userId, token));
		}
	}, []);

	console.log(words);

	const renderGame = useCallback((data) => {
		switch (linkName) {
			case 'Аудиовызов':
				return <AudioGame data={data} />;
			case 'Конструктор':
				return <Kit data={data} />;
			case 'Саванна':
				return <Savanna data={data} />;
		}
	}, []);

	return (
		<main className={classes.root}>
			{gameOver ? (
				<GameStats corrAnswersWords={answers.correct} wrongAnswersWords={answers.wrong} />
			) : words.length ? (
				<>
					<GameIntro name={linkName} settings={pathname.includes('true')} rules={rules} />
					<GameOverLay> {renderGame(words)} </GameOverLay>
				</>
			) : (
				<Loader />
			)}
		</main>
	);
};

Game.propTypes = {
	location: PropTypes.object,
};

export default Game;
