import React, { useState, useEffect } from 'react';
import classes from './Timer.module.scss';

export default function Timer() {
	const [counter, setCounter] = useState(60);

	useEffect(() => {
		counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
	}, [counter]);

	return (
		<div className={classes.timer}>
			<div className={classes.numbers}> {counter === 0 ? '0' : counter}</div>
		</div>
	);
}
