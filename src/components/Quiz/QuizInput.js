import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import { getKeys, getSubmitted } from '../../store/quiz/slices';
import { changeAnswer } from '../../store/quiz/actions';
import { FaCheck } from 'react-icons/fa';
import classes from './Quiz.module.scss';

const QuizInput = ({ variant, name, keyIndex }) => {
	const dispatch = useDispatch();
	const keys = useSelector(getKeys);
	const submitted = useSelector(getSubmitted);
	const ref = useRef(null);

	const handleChange = () => {
		dispatch(changeAnswer({ [keyIndex]: ref.current.value }));
	};

	useEffect(() => {
		if (submitted) {
			ref.current.dataset.error = keys[keyIndex] === ref.current.value;
		}
	}, [submitted]);

	return (
		<label className={classes.label}>
			<input type="radio" value={variant} name={name} onChange={handleChange} ref={ref} data-error="" required />
			<span className={classes.checkmark}>
				<FaCheck />
			</span>
			<span>{variant}</span>
		</label>
	);
};

QuizInput.propTypes = {
	variant: PropTypes.string,
	name: PropTypes.string,
	keyIndex: PropTypes.number,
};

export default QuizInput;
