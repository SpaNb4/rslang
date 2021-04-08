import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getGameStart } from '../../../store/game/slices';
import { globalClasses as c, menu } from '../../../common/constants';
import GameIntroInput from './GameIntroInput';
import classes from './GameIntro.module.scss';
import { fetchWords } from '../../../store/book/actions';
import _ from 'lodash';
import { setLevel } from '../../../store/game/actions';

const GameIntro = ({ name, rules, settings }) => {
	const dispatch = useDispatch();
	const defaultLevel = 0;
	const gameStart = useSelector(getGameStart);

	const [value, setValue] = useState(defaultLevel);
	const [isStart, setIsStart] = useState(false);
	const FROM_BOOK = 'from book';

	const handleChange = (evt) => {
		setValue(evt.target.value);
	};

	useEffect(() => {
		if (isStart) {
			if (value !== FROM_BOOK) {
				dispatch(setLevel(value));
				dispatch(fetchWords(value, _.random(0, 29)));
			} else {
				dispatch(setLevel(FROM_BOOK));
			}
		}
	}, [isStart, value]);

	const handleSubmit = (evt) => {
		evt.preventDefault();

		if (!settings) {
			setValue(FROM_BOOK);
		}

		setIsStart(true);
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
