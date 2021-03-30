import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { differenceBy, sampleSize } from 'lodash';
import { getUserWords, getUserWordsLoading } from '../../store/dictionary/slices';
import { getAnswers, getKeys, getSubmitted, getWords } from '../../store/quiz/slices';
import { fetchKeys, reset, setWords, submit } from '../../store/quiz/actions';
import Loader from '../Loader/Loader';
import DailyQuizItem from './QuizItem';
import { globalClasses as c, LocalStorageKeys as l, questionsData, DefaultValues as d } from '../../common/constants';
import { updateAttempts } from '../../common/helpers';
import classes from './Quiz.module.scss';
import { FaUndoAlt } from 'react-icons/fa';

const Quiz = () => {
	const dispatch = useDispatch();

	const userWords = useSelector(getUserWords);
	const loading = useSelector(getUserWordsLoading);
	const words = useSelector(getWords);
	const submitted = useSelector(getSubmitted);
	const answers = useSelector(getAnswers);
	const keys = useSelector(getKeys);

	const [date, setDate] = useState(null);
	const [errors, setErrors] = useState(null);
	const [variants, setVariants] = useState([]);
	const [attempts, setAttempts] = useState(0);
	const [showForm, setShowForm] = useState(false);

	useEffect(() => {
		setDate(new Date().toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' }));
	}, []);

	useEffect(() => {
		if (date) {
			const localDate = localStorage.getItem(l.QuizDate) || null;
			if (!localDate) {
				localStorage.setItem(l.QuizDate, date);
			} else if (localDate !== date) {
				updateAttempts();
			}
		}
	}, [date]);

	useEffect(() => {
		let timeout;
		if (userWords.length && !words.length) {
			timeout = setTimeout(() => dispatch(setWords(sampleSize(userWords, questionsData.length))), d.delay);
		}

		return () => {
			clearTimeout(timeout);
		};
	}, [userWords, words]);

	useEffect(() => {
		if (words.length) {
			const variants = questionsData.map((_, index) =>
				words.map((word) => word.optional[questionsData[index].key])
			);

			setVariants(variants);
			dispatch(fetchKeys(variants.map((variant, index) => variant[index])));
		}
	}, [words]);

	useEffect(() => {
		if (attempts > 0) {
			setShowForm(true);
		}
	}, [attempts]);

	useEffect(() => {
		if (words.length) {
			const localAttempts = localStorage.getItem(l.QuizAttempts) || null;

			if (localAttempts) {
				setAttempts(localAttempts);
			} else {
				updateAttempts();
			}
		}
	}, [words, submitted]);

	const handleSubmit = (evt) => {
		evt.preventDefault();

		setErrors(differenceBy(Object.values(answers), Object.values(keys)).length);

		localStorage.setItem(l.QuizAttempts, attempts - 1);
		dispatch(submit());
	};

	const handleClick = () => {
		dispatch(reset());
	};

	return (
		<div className={classes.root}>
			<h5 className={classes.title}>Викторина</h5>

			{loading ? (
				<Loader />
			) : (
				<>
					<span className={classes.date}>{date}</span>
					{words.length && variants.length ? (
						<>
							<p className={classes.attempts}>
								{attempts > 0 ? (
									<>
										Осталось {attempts} попытк{attempts > 1 ? 'и' : 'а'}
									</>
								) : (
									<>Попытки закончились. Возвращайтесь завтра</>
								)}
							</p>
							{showForm && (
								<form className={classes.form} onSubmit={handleSubmit} aria-disabled={submitted}>
									{words.map(({ optional }, index) => {
										return (
											<DailyQuizItem
												key={`quiz-${index}`}
												variants={variants[index]}
												word={optional.word}
												question={questionsData[index].question}
												keyIndex={index}
											/>
										);
									})}

									<button type="submit" className={c.button}>
										Проверить ответы
									</button>
								</form>
							)}
						</>
					) : (
						<Loader />
					)}
				</>
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
						aria-disabled={attempts < 1}
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
{
	/* <p className={classes.errors}>нет изученных слов</p> */
}
