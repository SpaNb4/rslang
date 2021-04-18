import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import { getGameStart } from '../../../store/game/slices';
import classes from './Timer.module.scss';

const totalTime = 60;
const circlePixels = 175;

export default function Timer({ onTimeout }) {
	const gameStarted = useSelector(getGameStart);

	const [counter, setCounter] = useState(totalTime);

	useEffect(() => {
		let timeout;
		if (gameStarted && counter > 0) {
			timeout = setTimeout(() => {
				const nextCounter = counter - 1;
				if (nextCounter === 0) {
					onTimeout();
				}
				setCounter(nextCounter);
			}, 1000);
		}
		return () => {
			clearTimeout(timeout);
		};
	}, [counter, gameStarted]);

	const currentCirclePixels = circlePixels * ((totalTime - counter) / totalTime);

	return (
		<div className={classes.countdown}>
			<div className={classes.numbers}> {counter === 0 ? '0' : counter}</div>
			<svg className={classes.svg}>
				<circle
					className={classes.circle}
					r="28"
					cx="30"
					cy="30"
					style={{ strokeDashoffset: currentCirclePixels }}
				></circle>
			</svg>
		</div>
	);
}

Timer.propTypes = {
	onTimeout: PropTypes.func,
};
