import React from 'react';
import { globalClasses as c } from '../../common/constants';
import AbsChart from './AbsChart';
import RelChart from './RelChart';
import Table from './Table';
import Loader from './../Loader/Loader';

import classes from './Stats.module.scss';
import { useSelector } from 'react-redux';
import { getAuthLoading, getAuthorized } from '../../store/app/slices';

const Stats = () => {
	const auth = useSelector(getAuthorized);
	const loading = useSelector(getAuthLoading);

	return (
		<main className={c.container}>
			<div className={classes.root}>
				{loading ? (
					<Loader />
				) : (
					<>
						<h2 className={c.pageTitle}>Статистика за один день</h2>
						<div className={classes.wrapper}>
							<Table />
						</div>
						{auth && (
							<>
								<h2 className={c.pageTitle}>Статистика за весь период обучения</h2>
								<div className={classes.wrapper}>
									<h4 className={classes.sub}>График №1</h4>
									<AbsChart />
								</div>
								<div className={classes.wrapper}>
									<h4 className={classes.sub}>График №2</h4>
									<RelChart />
								</div>
							</>
						)}
					</>
				)}
			</div>
		</main>
	);
};

export default Stats;
