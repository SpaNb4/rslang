import React, { useMemo, useRef, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import shuffle from 'lodash/shuffle';
import { getKeys, getSubmitted } from '../../store/quiz/slices';
import { FaCheck } from 'react-icons/fa';
import { changeAnswer } from '../../store/quiz/actions';
import classes from './DailyQuiz.module.scss';

const Input = ({ variant, name, keyIndex }) => {
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

const DailyQuizItem = ({ word, variants, question, keyIndex }) => {
	const shuffledVariants = useMemo(() => shuffle(variants), []);

	return (
		<fieldset className={classes.fieldset}>
			<legend>
				Выберите {question} слова <i>{word}</i>:
			</legend>
			<div className={classes.inputWrapper}>
				{shuffledVariants.length &&
					shuffledVariants.map((variant, index) => (
						<Input key={`variant-${index}`} name={word} variant={variant} keyIndex={keyIndex} />
					))}
			</div>
		</fieldset>
	);
};

DailyQuizItem.propTypes = {
	variants: PropTypes.array,
	word: PropTypes.string,
	question: PropTypes.string,
	keyIndex: PropTypes.number,
};

Input.propTypes = {
	variant: PropTypes.string,
	name: PropTypes.string,
	keyIndex: PropTypes.number,
};

export default DailyQuizItem;
