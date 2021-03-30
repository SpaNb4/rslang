import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllWords } from '../../store/book/slices';
import { differenceBy, sampleSize } from 'lodash';
import { getAnswers, getAttempts, getKeys, getSubmitted, getWords } from '../../store/quiz/slices';
import { fetchAttempts, fetchKeys, reset, setWords, submit } from '../../store/quiz/actions';
import Loader from '../Loader/Loader';
import DailyQuizItem from './QuizItem';
import { globalClasses as c, LocalStorageKeys as l } from '../../common/constants';
import classes from './Quiz.module.scss';
import { FaUndoAlt } from 'react-icons/fa';

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
	const [variants, setVariants] = useState([]);

	//temp
	const allWords = useSelector(getAllWords);
	const words = useSelector(getWords);
	const submitted = useSelector(getSubmitted);
	const answers = useSelector(getAnswers);
	const keys = useSelector(getKeys);
	const attempts = useSelector(getAttempts);

	useEffect(() => {
		setDate(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
	}, []);

	useEffect(() => {
		const localAttempts = localStorage.getItem(l.QuizAttempts) || null;

		if (localAttempts) {
			dispatch(fetchAttempts(localAttempts));
		} else {
			localStorage.setItem(l.QuizAttempts, attempts);
		}
	}, [words]);

	useEffect(() => {
		if (date) {
			const localDate = localStorage.getItem(l.QuizDate) || null;

			if (!localDate) {
				localStorage.setItem(l.QuizDate, date);
			} else if (localDate !== date) {
				dispatch(submit(3));
			}
		}
	}, [date]);

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
		if (words.length) {
			const variants = questionsData.map((_, index) => words.map((word) => word[questionsData[index].key]));

			setVariants(variants);
			dispatch(fetchKeys(variants.map((variant, index) => variant[index])));
		}
	}, [words]);

	const handleSubmit = (evt) => {
		evt.preventDefault();

		setErrors(differenceBy(Object.values(answers), Object.values(keys)).length);
		dispatch(submit(attempts - 1));
	};

	const handleClick = () => {
		dispatch(reset());
	};

	return (
		<div className={classes.root}>
			<span className={classes.date}>{date}</span>
			<h5 className={classes.title}>Викторина</h5>
			<p className={classes.attempts}>
				{attempts ? (
					<>
						У вас осталось {attempts} попытк{attempts > 1 ? 'и' : 'а'}
					</>
				) : (
					<>У вас больше нет попыток. Возвращайтесь завтра</>
				)}
			</p>
			{words.length && variants.length ? (
				<form className={classes.form} onSubmit={handleSubmit} aria-disabled={submitted}>
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
				<>
					<p className={classes.errors}>
						{errors ? (
							<>
								У вас {errors} ошибк{errors > 1 ? 'и' : 'а'}
							</>
						) : (
							<>Поздравляем! У вас нет ошибок</>
						)}
					</p>
					<button
						type="button"
						onClick={handleClick}
						className={classes.restartButton}
						aria-disabled={!attempts}
					>
						<FaUndoAlt />
						<span>Сыграть еще раз</span>
					</button>
				</>
			)}
		</div>
	);
};

export default Quiz;
