import React from 'react';
import { ExternalUrls } from '../../../common/constants';
import { AiFillSound } from 'react-icons/ai';
import classes from './GameStats.module.scss';
import { PropTypes } from 'prop-types';

function GameStats({ corrAnswersWords, wrongAnswersWords }) {
	function playSound(src) {
		const sound = new Audio(src);
		sound.play();
	}

	return (
		<div className={classes.gameStats}>
			<h1 className={classes.heading}>Статистика игры</h1>
			<div className={classes.allWordsWrapper}>
				<div className={classes.correctAnswers}>
					<h3>
						Знаю - <span className={classes.correctWordCount}>{corrAnswersWords.length}</span>
					</h3>
					<ul>
						{corrAnswersWords.map((word, index) => {
							return (
								<li key={index}>
									<AiFillSound onClick={() => playSound(`${ExternalUrls.Root}${word.audio}`)} />
									{word.word} - {word.wordTranslate}
								</li>
							);
						})}
					</ul>
				</div>
				<hr />
				<div className={classes.wrongAnswers}>
					<h3>
						Ошибок - <span className={classes.wrongWordCount}>{wrongAnswersWords.length}</span>
					</h3>
					<ul>
						{wrongAnswersWords.map((word, index) => {
							return (
								<li key={index}>
									<AiFillSound onClick={() => playSound(`${ExternalUrls.Root}${word.audio}`)} />
									{word.word} - {word.wordTranslate}
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</div>
	);
}

GameStats.propTypes = {
	corrAnswersWords: PropTypes.array.isRequired,
	wrongAnswersWords: PropTypes.array.isRequired,
};

export default GameStats;
