import React, { useMemo } from 'react';
import classes from './Stats.module.scss';
import { LocalStorageKeys, menu } from '../../common/constants';
import { useSelector } from 'react-redux';
import { getUserId } from '../../store/app/slices';
import { sumBy, map, flatten } from 'lodash';

const Table = () => {
	const currUserId = useSelector(getUserId) || LocalStorageKeys.userStats;

	const { games } = menu;

	const data = JSON.parse(localStorage.getItem(currUserId)) || [];

	const calculatePercent = (a, b) => (a * 100) / (a + b);

	const totalPercent = useMemo(() => calculatePercent(sumBy(data, 'correct'), sumBy(data, 'wrong')));
	const totalNumber = useMemo(() => flatten(map(data, 'words')).length);

	return (
		<>
			<table className={classes.table}>
				<thead>
					<tr>
						<th className={classes.header}></th>
						{games.map((game, index) => (
							<th className={classes.header} key={`game-${index}`}>
								{game.linkName}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Количество изученных слов</td>
						{games.map((_, index) => (
							<td key={`number${index}`}>{data[index] ? data[index].words.length : 0}</td>
						))}
					</tr>

					<tr>
						<td>Процент правильных ответов</td>
						{games.map((_, index) => (
							<td key={`proc${index}`}>
								{data[index] ? calculatePercent(data[index].correct, data[index].wrong) : 0}%
							</td>
						))}
					</tr>

					<tr>
						<td>Самая длинная серия правильных ответов</td>
						{games.map((_, index) => (
							<td key={`streak${index}`}>{data[index] ? data[index].streak : 0}</td>
						))}
					</tr>

					<tr className={classes.result}>
						<td colSpan={games.length}>Общее количество изученных слов</td>
						<td>{totalNumber || 0}</td>
					</tr>

					<tr className={classes.result}>
						<td colSpan={games.length}>Процент правильных ответов</td>
						<td>{totalPercent || 0}%</td>
					</tr>
				</tbody>
			</table>
		</>
	);
};

export default Table;
