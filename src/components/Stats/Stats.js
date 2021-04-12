import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import AbsChart from './AbsChart';
import RelChart from './RelChart';
import Table from './Table';
import Loader from './../Loader/Loader';

import { getAuthLoading, getAuthorized, getCurrentDate } from '../../store/app/slices';
import { getStatistics } from '../../store/statistics/slices';
import { globalClasses as c } from '../../common/constants';

import { getDate } from '../../common/helpers';
import { FaInfoCircle } from 'react-icons/fa';
import classes from './Stats.module.scss';

const Stats = () => {
	const auth = useSelector(getAuthorized);
	const loading = useSelector(getAuthLoading);
	const today = useSelector(getCurrentDate);
	const stats = useSelector(getStatistics);

	const [date, setDate] = useState(null);

	useEffect(() => {
		if (stats.length) {
			setDate(getDate(stats[0].day));
		}
	}, [stats]);

	return (
		<main className={c.container}>
			<div className={classes.root}>
				{loading ? (
					<Loader />
				) : (
					<>
						<h2 className={c.pageTitle}>Статистика на {today}</h2>
						<div className={classes.wrapper}>
							<Table />
						</div>
						{auth && (
							<div className={classes.statsWrapper}>
								{stats.length ? (
									<>
										<h2 className={c.pageTitle}>Статистика с {date}</h2>
										<div className={classes.wrapper}>
											<h4 className={classes.sub}>График №1</h4>
											<p className={classes.info}>
												<FaInfoCircle />
												количество изученных слов
											</p>
											<AbsChart />
										</div>
										<div className={classes.wrapper}>
											<h4 className={classes.sub}>График №2</h4>
											<p className={classes.info}>
												<FaInfoCircle />
												увеличение количества изученных слов
											</p>
											<RelChart />
										</div>
									</>
								) : (
									<Loader />
								)}
							</div>
						)}
					</>
				)}
			</div>
		</main>
	);
};

export default Stats;
