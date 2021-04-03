import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';
import { getCurrCharIndex, getCurrentWord, getFocusedIndex } from '../../../store/kit/slices';
import { increaseCharIndex } from '../../../store/kit/actions';
import { getGameStart } from '../../../store/game/slices';
import { evtKeys } from '../../../common/constants';
import classes from './Kit.module.scss';

const ShuffledChar = ({ char, index }) => {
	const dispatch = useDispatch();
	const gameStart = useSelector(getGameStart);
	const currentWord = useSelector(getCurrentWord);
	const currCharIndex = useSelector(getCurrCharIndex);
	const focusedIndex = useSelector(getFocusedIndex);
	const [selected, setSelected] = useState(false);

	const ref = useRef(null);

	const handleClick = (evt) => {
		const char = evt.target.value;

		if (!selected && char === currentWord[currCharIndex]) {
			setSelected(true);
			dispatch(increaseCharIndex());
		}
	};

	useEffect(() => {
		if (index === focusedIndex) {
			ref.current.focus();
		}
	}, [gameStart, focusedIndex]);

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
			onKeyDown={(evt) => (evt.key === evtKeys.enter ? handleClick(evt) : null)}
			ref={ref}
		>
			{char}
		</button>
	);
};

ShuffledChar.propTypes = {
	char: PropTypes.string,
	index: PropTypes.number,
};

export default React.memo(ShuffledChar);
