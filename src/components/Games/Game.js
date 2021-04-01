import React, { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getAllWords } from '../../store/book/slices';
import { getAnswers, getGameOver } from '../../store/game/slices';

import Loader from '../Loader/Loader';
import GameIntro from './GameIntro/GameIntro';
import GameStats from './GameStats/GameStats';
import GameOverLay from './GameOverlay/GameOverlay';
import AudioGame from './AudioGame/AudioGame';
import Kit from './Kit/Kit';
import Savanna from './Savanna/Savanna';
import GameSprint from './GameSprint/GameSprint';
import { menu } from '../../common/constants';
import classes from './Game.module.scss';
import { updateGame } from '../../store/game/actions';

const Game = () => {
	const dispatch = useDispatch();
	const { pathname } = useLocation();
	const allWords = useSelector(getAllWords);
	const gameOver = useSelector(getGameOver);
	const answers = useSelector(getAnswers);
	const { linkName, linkId, rules } = menu.games.find((elem) => pathname.includes(elem.linkId));

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
			{gameOver ? (
				<GameStats corrAnswersWords={answers.correct} wrongAnswersWords={answers.wrong} />
			) : allWords.length ? (
				<>
					<GameIntro name={linkName} settings={pathname.includes('true')} rules={rules} />
					<GameOverLay> {renderGame(allWords)} </GameOverLay>
				</>
			) : (
				<Loader />
			)}
		</main>
	);
};

export default Game;
