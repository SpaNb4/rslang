import React, { useState, useEffect } from 'react';
import classes from './Timer.module.scss';
import { PropTypes } from 'prop-types';

export default function Timer({ onTimeout }) {
	const [counter, setCounter] = useState(60);

	useEffect(() => {
		counter > 0 &&
			setTimeout(() => {
				const nextCounter = counter - 1;
				if (nextCounter === 0) {
					onTimeout();
				}
				setCounter(nextCounter);
			}, 1000);
	}, [counter]);
	return (
		<div className={classes.timer}>
			<div className={classes.numbers}> {counter === 0 ? '0' : counter}</div>
		</div>
	);
}

Timer.propTypes = {
	onTimeout: PropTypes.function,
};
