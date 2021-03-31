import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { startGame } from '../../../store/game/actions';
import { getCurrentLevel } from '../../../store/game/slices';
import { globalClasses as c } from '../../../common/constants';
import GameIntroInput from './GameIntroInput';
import classes from './GameIntro.module.scss';

const levels = [0, 1, 2, 3, 4, 5];

const GameIntro = ({ name, rules, settings }) => {
	const dispatch = useDispatch();
	const defaultLevel = Number(useSelector(getCurrentLevel));

	const [value, setValue] = useState(null);
	const [hidden, setHidden] = useState(false);

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
			setHidden(true);
		}
	};

	return (
		<div className={classes.root} aria-hidden={hidden}>
			<h2 className={c.sectionTitle}>Игра &#34;{name}&#34;</h2>
			<p className={classes.rules}>{rules}</p>
			<form onSubmit={handleSubmit} className={classes.form}>
				{settings && (
					<div className={classes.wrapper}>
						{levels.map((level) => (
							<GameIntroInput
								key={`level-${level}`}
								level={level}
								checked={level === defaultLevel}
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
