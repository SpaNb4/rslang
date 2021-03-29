import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllWords } from '../../store/book/slices';
import { differenceBy, sampleSize } from 'lodash';
import { getAnswers, getKeys, getSubmitted } from '../../store/quiz/slices';
import { fetchKeys, submit } from '../../store/quiz/actions';
import classes from './DailyQuiz.module.scss';
import Loader from '../Loader/Loader';
import DailyQuizItem from './DailyQuizItem';
import { globalClasses as c } from '../../common/constants';

// const questionsData = [
// 	{
// 		property: 'translation',
// 		question: 'правильный перевод',
// 	},
// 	{
// 		property: 'meaning',
// 		question: 'правильное значение',
// 	},
// 	{
// 		property: 'transcription',
// 		question: 'правильную транскрипцию',
// 	},
// ];

const questionsData = ['правильный перевод', 'правильное значение', 'правильную транскрипцию'];

const DailyQuiz = () => {
	const dispatch = useDispatch();
	const [date, setDate] = useState(null);
	const [errors, setErrors] = useState(null);

	//temp
	const allWords = useSelector(getAllWords);
	const submitted = useSelector(getSubmitted);

	const [randomWords, setRandomWords] = useState([]);
	const [variants, setVariants] = useState([]);

	useEffect(() => {
		if (allWords.length) {
			setRandomWords(sampleSize(allWords, questionsData.length));
		}
	}, [allWords]);

	useEffect(() => {
		setDate(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
	}, []);

	useEffect(() => {
		if (randomWords.length) {
			const variants = [
				randomWords.map((data) => data.wordTranslate),
				randomWords.map((data) => data.textMeaningTranslate),
				randomWords.map((data) => data.transcription),
			];

			const keys = variants.map((variant, index) => variant[index]);

			setVariants(variants);
			dispatch(fetchKeys(keys));
		}
	}, [randomWords]);

	const answers = useSelector(getAnswers);
	const keys = useSelector(getKeys);

	const handleSubmit = (evt) => {
		evt.preventDefault();

		dispatch(submit());
		setErrors(differenceBy(Object.values(answers), Object.values(keys)).length);
	};

	return (
		<div className={classes.root}>
			<span className={classes.date}>{date}</span>
			<h5 className={classes.title}>Викторина</h5>

			{randomWords.length && variants.length ? (
				<form className={classes.form} onSubmit={handleSubmit} data-submit={submitted}>
					{randomWords.map((wordData, index) => {
						return (
							<DailyQuizItem
								key={`quiz-${index}`}
								variants={variants[index]}
								word={wordData.word}
								question={questionsData[index]}
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

export default DailyQuiz;
