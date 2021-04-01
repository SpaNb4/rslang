import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';
import { getCurrCharIndex, getCurrentWord } from '../../../store/kit/slices';
import { increaseCharIndex } from '../../../store/kit/actions';

import classes from './Kit.module.scss';

const ShuffledChar = ({ char }) => {
	const dispatch = useDispatch();
	const currentWord = useSelector(getCurrentWord);
	const currCharIndex = useSelector(getCurrCharIndex);
	const [selected, setSelected] = useState(false);

	const handleClick = (evt) => {
		const char = evt.target.value;

		if (!selected && char === currentWord[currCharIndex]) {
			setSelected(true);
			dispatch(increaseCharIndex());
		}
	};

	useEffect(() => {
		setSelected(false);
	}, [currentWord]);

	return (
		<button
			className={classes.shuffledChar}
			type="button"
			aria-label="choose letter"
			aria-selected={selected}
			value={char}
			onClick={handleClick}
		>
			{char}
		</button>
	);
};

ShuffledChar.propTypes = {
	char: PropTypes.string,
};

export default ShuffledChar;
