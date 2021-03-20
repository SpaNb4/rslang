import React from 'react';
import classes from './Features.module.scss';
import { SECTION_TITLE } from '../../common/constants';

const FeatureCard = () => {
	return (
		<div className={classes.card}>
			<h5 className={classes.title}>Совместимость с мобильными устройствами </h5>
			<p></p>
		</div>
	);
};

const Features = () => {
	return (
		<section className={classes.features}>
			<h2 className={SECTION_TITLE}>Фишки приложения</h2>
			<div className={classes.grid}>
				<FeatureCard />
			</div>
		</section>
	);
};

export default Features;
