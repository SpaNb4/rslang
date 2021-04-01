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
import GameSprint from './GameSprint/GameSprint';
import { menu } from '../../common/constants';
import classes from './Game.module.scss';
import { PropTypes } from 'prop-types';
import { MIN_WORD_COUNT } from './../../common/constants';
import { getToken, getUserId } from './../../store/app/slices';
import { fetchAggregatedWords } from '../../store/book/actions';
import { getAggregatedWordsWords } from './../../store/book/slices';
import { updateGame } from '../../store/game/actions';
import { getGameStart } from './../../store/game/slices';

const Game = (props) => {
	const dispatch = useDispatch();
	const { pathname } = useLocation();
	const prevPageWords = useSelector(getAggregatedWordsWords);
	const currWords = props.location.state.words;
	const page = props.location.state.page;
	const [words, setWords] = useState([]);
	const [isEnoughWords, setIsEnoughWords] = useState(true);
	const gameOver = useSelector(getGameOver);
	const isGameStart = useSelector(getGameStart);
	const answers = useSelector(getAnswers);
	const userId = useSelector(getUserId);
	const token = useSelector(getToken);
	const { linkName, linkId, rules } = menu.games.find((elem) => pathname.includes(elem.linkId));

	useEffect(() => {
		if (isGameStart && currWords.length <= MIN_WORD_COUNT) {
			setWords([...prevPageWords, ...currWords]);
		} else if (isGameStart) {
			setWords(currWords);
		}
	}, [isGameStart]);

	useEffect(() => {
		if (props.location.state && page !== 0 && currWords.length <= MIN_WORD_COUNT) {
			dispatch(fetchAggregatedWords(null, page - 1, userId, token));
		} else if (page === 0 && currWords.length <= MIN_WORD_COUNT) {
			setIsEnoughWords(false);
		}
	}, []);

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
				) : prevPageWords.length || currWords.length ? (
					<>
						{isGameStart ? (
							<GameOverLay> {renderGame(words)} </GameOverLay>
						) : (
							<GameIntro name={linkName} settings={pathname.includes('true')} rules={rules} />
						)}
					</>
				) : (
					<Loader />
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
