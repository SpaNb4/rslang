import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import { FaStar } from 'react-icons/fa';
import { getAnswers } from '../../../store/kit/slices';

const colors = {
	error: '#f00',
	correct: `#fd0`,
};

const IconStar = ({ index }) => {
	const answers = useSelector(getAnswers);
	const [iconColor, setIconColor] = useState('');

	useEffect(() => {
		if (answers.includes(index)) {
			setIconColor(colors.correct);
		} else if (answers[index] === null) {
			setIconColor(colors.error);
		}
	}, [answers]);

	return (
		<li data-index={index}>
			<FaStar color={iconColor} />
		</li>
	);
};

IconStar.propTypes = {
	index: PropTypes.number,
};

export default IconStar;
