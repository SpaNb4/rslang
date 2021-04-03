import React, { useMemo } from 'react';
import { colors } from '../../common/constants';
import Chart from './Chart';
import { createChartData } from '../../common/helpers';

const wordsByDay = [50, 10, 56, 40, 48, 35, 45, 28, 56];
const TotalNumberOfWords = 1000;

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

export default RelChart;
