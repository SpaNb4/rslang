import React, { useMemo } from 'react';
import { PropTypes } from 'prop-types';
import shuffle from 'lodash/shuffle';
import QuizInput from './QuizInput';
import classes from './Quiz.module.scss';

const QuizItem = ({ word, variants, question, keyIndex }) => {
	const shuffledVariants = useMemo(() => shuffle(variants), []);

	return (
		<fieldset className={classes.fieldset}>
			<legend>
				Выберите {question} слова <i>{word}</i>:
			</legend>
			<div className={classes.inputWrapper}>
				{shuffledVariants.length &&
					shuffledVariants.map((variant, index) => (
						<QuizInput key={`variant-${index}`} name={word} variant={variant} keyIndex={keyIndex} />
					))}
			</div>
		</fieldset>
	);
};

QuizItem.propTypes = {
	variants: PropTypes.array,
	word: PropTypes.string,
	question: PropTypes.string,
	keyIndex: PropTypes.number,
};

export default QuizItem;
