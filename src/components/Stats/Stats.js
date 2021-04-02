import React, { useMemo } from 'react';
import { PropTypes } from 'prop-types';
import { colors, globalClasses as c } from '../../common/constants';
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
const TotalNumberOfWords = 1000;

const Chart = ({ data, color }) => {
	return (
		<FlexibleWidthXYPlot height={300} width={600} color={color}>
			<VerticalGridLines />
			<HorizontalGridLines />
			<XAxis />
			<YAxis />
			<VerticalBarSeries data={data} />
		</FlexibleWidthXYPlot>
	);
};

Chart.propTypes = {
	data: PropTypes.array.isRequired,
	color: PropTypes.string,
};

const createChartData = (arr) => arr.map((num, index) => ({ x: index, y: num }));

const AbsChart = () => {
	const data = useMemo(() => createChartData(wordsByDay));
	return <Chart data={data} color={colors.ocean} />;
};

const RelChart = () => {
	const data = useMemo(() => {
		const relWordsByDay = [];

		wordsByDay.reduce((acc, value) => {
			const sum = acc + value;
			relWordsByDay.push((sum * 1000) / TotalNumberOfWords);
			return sum;
		});

		return createChartData(relWordsByDay);
	});

	return <Chart data={data} color={colors.cardinal} />;
};

const Stats = () => {
	return (
		<main className={c.container}>
			<div className={classes.root}>
				<h2 className={c.pageTitle}>Статистика за один день</h2>
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
				<h2 className={c.pageTitle}>Статистика за весь период обучения</h2>

				<div className={classes.wrapper}>
					<h4 className={classes.sub}>График №1</h4>
					<AbsChart />
				</div>
				<div className={classes.wrapper}>
					<h4 className={classes.sub}>График №2</h4>
					<RelChart />
				</div>
			</div>
		</main>
	);
};

export default Stats;
