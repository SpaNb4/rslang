import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { getUserWords } from '../../store/dictionary/slices';
import Loader from '../Loader/Loader';

import GameIntro from './GameIntro/GameIntro';
import GameStats from './GameStats/GameStats';
import GameOverLay from './GameOverlay/GameOverlay';
import AudioGame from './AudioGame/AudioGame';
import Kit from './Kit/Kit';
import Savanna from './Savanna/Savanna';
import classes from './Game.module.scss';
import { useLocation } from 'react-router';
import { menu } from '../../common/constants';
import { getAnswers, getGameOver } from '../../store/game/slices';

const Game = () => {
	const { pathname } = useLocation();
	const userWords = useSelector(getUserWords);
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
			{userWords.length ? (
				<>
					<GameIntro name={linkName} settings={pathname.includes('true')} rules={rules} />
					<GameOverLay> {renderGame(userWords)} </GameOverLay>
				</>
			) : (
				<Loader />
			)}
			{gameOver && <GameStats corrAnswersWords={answers.correct} wrongAnswersWords={answers.wrong} />}
		</main>
	);
};

export default Game;
