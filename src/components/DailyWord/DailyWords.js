import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWords } from '../../store/book/actions';
import { getAllWords } from '../../store/book/slices';
import sampleSize from 'lodash/sampleSize';
import DailyWordItem from './DailyWordItem';
import classes from './DailyWord.module.scss';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

import InfiniteCarousel from 'react-leaf-carousel';
import Loader from '../Loader/Loader';

const NextArrow = ({ clickHandler }) => {
	return (
		<button className={classes.arrow} onClick={clickHandler}>
			<FaArrowRight />
		</button>
	);
};

const PrevArrow = ({ clickHandler }) => {
	return (
		<button className={classes.arrow} onClick={clickHandler}>
			<FaArrowLeft />
		</button>
	);
};

NextArrow.propTypes = {
	clickHandler: PropTypes.func,
};

PrevArrow.propTypes = {
	clickHandler: PropTypes.func,
};

const DailyWord = () => {
	const dispatch = useDispatch();
	//temp
	const allWords = useSelector(getAllWords);

	const [wordDataArr, setwWordDataArr] = useState([]);
	const [date, setDate] = useState(null);

	useEffect(() => {
		if (allWords.length) {
			setwWordDataArr(sampleSize(allWords, 3));
		}
	}, [allWords]);

	//temp
	useEffect(() => {
		dispatch(fetchWords());
	}, []);

	useEffect(() => {
		setDate(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
	}, []);

	const breakpoints = [
		{
			breakpoint: 768,
			settings: {
				arrows: false,
			},
		},
	];

	return (
		<div className={classes.root}>
			<span className={classes.date}>Word of the Day: {date}</span>
			{wordDataArr.length ? (
				<InfiniteCarousel dots={true} breakpoints={breakpoints}>
					{wordDataArr.map((wordData, index) => (
						<DailyWordItem key={`daily-word-${index}`} {...wordData} />
					))}
				</InfiniteCarousel>
			) : (
				<Loader />
			)}
		</div>
	);
};

export default DailyWord;
