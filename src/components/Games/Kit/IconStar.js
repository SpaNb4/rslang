import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { getAnswers } from '../../../store/kit/slices';
import { colors } from '../../../common/constants';

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

	return <li data-index={index}>{iconColor ? <FaStar color={iconColor} /> : <FaRegStar color={iconColor} />}</li>;
};

IconStar.propTypes = {
	index: PropTypes.number,
};

export default IconStar;
