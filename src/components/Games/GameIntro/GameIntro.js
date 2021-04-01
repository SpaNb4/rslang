import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { startGame } from '../../../store/game/actions';
import { getCurrentLevel, getGameStart } from '../../../store/game/slices';
import { globalClasses as c, menu } from '../../../common/constants';
import GameIntroInput from './GameIntroInput';
import classes from './GameIntro.module.scss';

const GameIntro = ({ name, rules, settings }) => {
	const dispatch = useDispatch();
	const defaultLevel = Number(useSelector(getCurrentLevel));
	const gameStart = useSelector(getGameStart);

	const [value, setValue] = useState(null);

	const handleChange = (evt) => {
		setValue(evt.target.value);
	};

	useEffect(() => {
		setValue(defaultLevel);
	}, []);

	const handleSubmit = (evt) => {
		evt.preventDefault();

		if (value !== null) {
			dispatch(startGame(value));
		}
	};

	return (
		<div className={classes.root} aria-hidden={gameStart}>
			<h2 className={c.sectionTitle}>Игра &#34;{name}&#34;</h2>
			<p className={classes.rules}>{rules}</p>
			<form onSubmit={handleSubmit} className={classes.form}>
				{settings && (
					<div className={classes.wrapper}>
						{menu.sections.length &&
							menu.sections.map((_, index) => (
								<GameIntroInput
									key={`level-${index}`}
									level={index}
									checked={index === defaultLevel}
									handleChange={handleChange}
								/>
							))}
					</div>
				)}

				<button className={c.button} type="submit">
					ok
				</button>
			</form>
		</div>
	);
};

GameIntro.propTypes = {
	name: PropTypes.string,
	rules: PropTypes.string,
	settings: PropTypes.bool,
};

export default GameIntro;
