import React, { useCallback } from 'react';
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { getAllWords } from '../../store/book/slices';
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

const Game = () => {
	const { pathname } = useLocation();
	const allWords = useSelector(getAllWords);
	const gameOver = useSelector(getGameOver);
	const answers = useSelector(getAnswers);
	const { linkName, rules } = menu.games.find((elem) => pathname.includes(elem.linkId));

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
			{allWords.length ? (
				<>
					<GameIntro name={linkName} settings={pathname.includes('true')} rules={rules} />
					<GameOverLay> {renderGame(allWords)} </GameOverLay>
				</>
			) : (
				<Loader />
			)}
			{gameOver && <GameStats corrAnswersWords={answers.correct} wrongAnswersWords={answers.wrong} />}
		</main>
	);
};

export default Game;
