import React, { useMemo } from 'react';
import classes from './Stats.module.scss';
import { LocalStorageKeys, menu } from '../../common/constants';
import { useSelector } from 'react-redux';
import { getUserId } from '../../store/app/slices';
import _ from 'lodash';

const Table = () => {
	const currUserId = useSelector(getUserId) || LocalStorageKeys.userStats;

	const { games } = menu;

	const data = JSON.parse(localStorage.getItem(currUserId)) || [];

	const calculatePercent = (a, b) => Math.floor((a * 100) / (a + b));

	const totalPercent = useMemo(() => calculatePercent(_.sumBy(data, 'correct'), _.sumBy(data, 'wrong')));
	const totalNumber = useMemo(() => _.flatten(_.map(data, 'words')).length);

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
						{games.map((elem) => {
							const index = _.findIndex(data, { name: elem.linkId });
							return <td key={`number${elem.linkId}`}>{data[index] ? data[index].words.length : 0}</td>;
						})}
					</tr>

					<tr>
						<td>Процент правильных ответов</td>
						{games.map((elem) => {
							const index = _.findIndex(data, { name: elem.linkId });
							return (
								<td key={`proc${elem.linkId}`}>
									{data[index] ? calculatePercent(data[index].correct, data[index].wrong) : 0}%
								</td>
							);
						})}
					</tr>

					<tr>
						<td>Самая длинная серия правильных ответов</td>
						{games.map((elem) => {
							const index = _.findIndex(data, { name: elem.linkId });
							return <td key={`streak${elem.linkId}`}>{data[index] ? data[index].streak : 0}</td>;
						})}
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
