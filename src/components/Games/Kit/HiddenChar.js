import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import { getCurrCharIndex, getCurrentWord } from '../../../store/kit/slices';
import { playChar } from '../../../common/helpers';
import classes from './Kit.module.scss';

const HiddenChar = ({ char, index }) => {
	const [hidden, setHidden] = useState(true);
	const currCharIndex = useSelector(getCurrCharIndex);
	const currentWord = useSelector(getCurrentWord);

	useEffect(() => {
		if (index === currCharIndex - 1) {
			setHidden(false);
			playChar();
		}
	}, [currCharIndex]);

	useEffect(() => {
		setHidden(true);
	}, [currentWord]);

	return (
		<span className={classes.hiddenCharWrapper}>
			<span className={classes.hiddenChar} aria-hidden={hidden}>
				{char}
			</span>
		</span>
	);
};

HiddenChar.propTypes = {
	index: PropTypes.number,
	char: PropTypes.string,
};

export default HiddenChar;
