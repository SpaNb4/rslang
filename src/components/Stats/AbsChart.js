import React, { useMemo } from 'react';
import { colors } from '../../common/constants';
import Chart from './Chart';
import { createChartData } from '../../common/helpers';

const wordsByDay = [50, 10, 56, 40, 48, 35, 45, 28, 56];

const AbsChart = () => {
	const data = useMemo(() => createChartData(wordsByDay));
	return <Chart data={data} color={colors.ocean} />;
};

export default AbsChart;
