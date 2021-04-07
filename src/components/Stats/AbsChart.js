import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getStatistics } from '../../store/statistics/slices';
import { createChartData } from '../../common/helpers';
import { colors } from '../../common/constants';

import {
	FlexibleWidthXYPlot,
	VerticalBarSeries,
	XAxis,
	YAxis,
	VerticalGridLines,
	HorizontalGridLines,
} from 'react-vis';
import 'react-vis/dist/style.css';

const AbsChart = () => {
	const statsData = useSelector(getStatistics);
	// const statsData = mockChartData;
	const data = useMemo(() => statsData.length && createChartData(statsData));
	return data ? (
		<FlexibleWidthXYPlot height={300} width={600} color={colors.ocean} xType="ordinal">
			<VerticalGridLines />
			<HorizontalGridLines />
			<XAxis title="дата" bottom={20} />
			<YAxis title="кол-во слов" left={-20} />
			<VerticalBarSeries data={data} barWidth={0.15} />
		</FlexibleWidthXYPlot>
	) : (
		<div>loading</div>
	);
};

export default AbsChart;
