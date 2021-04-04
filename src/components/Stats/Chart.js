import React from 'react';
import { PropTypes } from 'prop-types';
import {
	FlexibleWidthXYPlot,
	VerticalBarSeries,
	XAxis,
	YAxis,
	VerticalGridLines,
	HorizontalGridLines,
} from 'react-vis';
import 'react-vis/dist/style.css';

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

export default Chart;
