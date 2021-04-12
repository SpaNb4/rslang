import React, { useMemo } from 'react';
import { colors } from '../../common/constants';
import { createChartData } from '../../common/helpers';
import { useSelector } from 'react-redux';
import { getStatistics } from '../../store/statistics/slices';
import { FlexibleWidthXYPlot, LineMarkSeries, XAxis, YAxis, VerticalGridLines, HorizontalGridLines } from 'react-vis';
import 'react-vis/dist/style.css';

const RelChart = () => {
	const statsData = useSelector(getStatistics);

	const data = useMemo(() => {
		if (statsData.length) {
			const chartData = createChartData(statsData);
			let sum = 0;

			return chartData.map((elem) => {
				sum += elem.y;
				return { x: elem.x, y: sum };
			});
		}
	});

	return data ? (
		<FlexibleWidthXYPlot height={300} width={600} color={colors.cardinal} xType="ordinal">
			<VerticalGridLines />
			<HorizontalGridLines />
			<XAxis title="дата" />
			<YAxis title="кол-во слов" />
			<LineMarkSeries data={data} strokeWidth={8} />
		</FlexibleWidthXYPlot>
	) : (
		<div>loading</div>
	);
};

export default RelChart;
