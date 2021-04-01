import React, { useMemo } from 'react';
import Loader from '../Loader/Loader';
import { globalClasses as c } from '../../common/constants';
import {
	FlexibleWidthXYPlot,
	VerticalBarSeries,
	XAxis,
	YAxis,
	VerticalGridLines,
	HorizontalGridLines,
} from 'react-vis';
import classes from './Stats.module.scss';
import 'react-vis/dist/style.css';

// mock data
const data = [
	{
		name: 'Саванна',
		numberOfWords: 5,
		procentOfCorrectWords: 0.7,
		longetsSeria: 7,
	},
	{
		name: 'Спринт',
		numberOfWords: 3,
		procentOfCorrectWords: 0.7,
		longetsSeria: 15,
	},
	{
		name: 'Аудиовызов',
		numberOfWords: 70,
		procentOfCorrectWords: 0.7,
		longetsSeria: 8,
	},
	{
		name: 'Конструктор',
		numberOfWords: 120,
		procentOfCorrectWords: 0.7,
		longetsSeria: 0,
	},
];
const rows = ['Количество изученных слов', 'Процент правильных ответов', 'Самая длинная серия правильных ответов'];

const wordsByDay = [50, 10, 56, 40, 48, 35, 45, 28, 56];

const Chart = () => {
	const data = useMemo(() => wordsByDay.map((num, index) => ({ x: index, y: num })));

	return (
		<>
			{data ? (
				<FlexibleWidthXYPlot height={300} width={600} color="#49c0b8">
					<VerticalGridLines />
					<HorizontalGridLines />
					<XAxis />
					<YAxis />
					<VerticalBarSeries data={data} />
				</FlexibleWidthXYPlot>
			) : (
				<Loader />
			)}
		</>
	);
};

const Stats = () => {
	return (
		<div className={classes.root}>
			<h2 className={c.pageTitle}>Статистика</h2>
			<h5 className={classes.sub}>За один день</h5>
			<div className={classes.wrapper}>
				{data.length && (
					<table className={classes.table}>
						<thead>
							<tr>
								<th className={classes.header}></th>
								{data.map((game, index) => (
									<th className={classes.header} key={`game-${index}`}>
										{game.name}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{rows.length &&
								rows.map((row, i) => {
									return (
										<tr key={`row-${i}`}>
											<td>{row}</td>
											{data.map((game, j) => {
												const value = Object.values(data[j])[i + 1];
												return <td key={`${game.name}${j}`}>{value}</td>;
											})}
										</tr>
									);
								})}
							<tr className={classes.result}>
								<td colSpan={data.length}>Общее количество изученных слов</td>
								<td>666</td>
							</tr>
							<tr className={classes.result}>
								<td colSpan={data.length}>Процент правильных ответов</td>
								<td>100%</td>
							</tr>
						</tbody>
					</table>
				)}
			</div>
			<h5 className={classes.sub}>За все время обучения</h5>
			<div className={classes.wrapper}>
				<Chart />
			</div>
		</div>
	);
};

export default Stats;
