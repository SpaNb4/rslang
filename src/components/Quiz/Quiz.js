import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllWords } from '../../store/book/slices';
import { differenceBy, sampleSize } from 'lodash';
import { getAnswers, getKeys, getSubmitted, getWords } from '../../store/quiz/slices';
import { fetchKeys, setWords, submit } from '../../store/quiz/actions';
import Loader from '../Loader/Loader';
import DailyQuizItem from './QuizItem';
import { globalClasses as c } from '../../common/constants';
import classes from './Quiz.module.scss';

// const questionsData = ['правильный перевод', 'правильное значение', 'правильную транскрипцию'];

const questionsData = [
	{
		question: 'правильный перевод',
		key: 'wordTranslate',
	},
	{
		question: '',
		key: 'textMeaningTranslate',
	},
	{
		question: 'правильную транскрипцию',
		key: 'transcription',
	},
];

const Quiz = () => {
	const dispatch = useDispatch();
	const [date, setDate] = useState(null);
	const [errors, setErrors] = useState(null);

	//temp
	const allWords = useSelector(getAllWords);
	const words = useSelector(getWords);
	const submitted = useSelector(getSubmitted);
	const answers = useSelector(getAnswers);
	const keys = useSelector(getKeys);

	const [variants, setVariants] = useState([]);

	useEffect(() => {
		let timeout;
		if (allWords.length && !words.length) {
			timeout = setTimeout(() => dispatch(setWords(sampleSize(allWords, questionsData.length))), 1000);
		}
		return () => {
			clearTimeout(timeout);
		};
	}, [allWords, words]);

	useEffect(() => {
		setDate(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
	}, []);

	useEffect(() => {
		if (words.length) {
			const variants = questionsData.map((_, index) => words.map((word) => word[questionsData[index].key]));

			setVariants(variants);
			dispatch(fetchKeys(variants.map((variant, index) => variant[index])));
		}
	}, [words]);

	const handleSubmit = (evt) => {
		evt.preventDefault();

		dispatch(submit());
		setErrors(differenceBy(Object.values(answers), Object.values(keys)).length);
	};

	return (
		<div className={classes.root}>
			<span className={classes.date}>{date}</span>
			<h5 className={classes.title}>Викторина</h5>

			{words.length && variants.length ? (
				<form className={classes.form} onSubmit={handleSubmit} data-submit={submitted}>
					{words.map((wordData, index) => {
						return (
							<DailyQuizItem
								key={`quiz-${index}`}
								variants={variants[index]}
								word={wordData.word}
								question={questionsData[index].question}
								keyIndex={index}
							/>
						);
					})}

					<button type="submit" className={c.button}>
						Проверить ответы
					</button>
				</form>
			) : (
				<Loader />
			)}
			{submitted && (
				<div className={classes.errors}>
					{errors ? (
						<span>
							У вас {errors} ошибк{errors > 1 ? 'и' : 'а'}
						</span>
					) : (
						<span>Поздравляем! У вас нет ошибок</span>
					)}
				</div>
			)}
		</div>
	);
};

export default Quiz;
