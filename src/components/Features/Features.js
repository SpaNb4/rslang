import React from 'react';
import { PropTypes } from 'prop-types';
import classes from './Features.module.scss';
import { globalClasses as c, ourFeatures } from '../../common/constants';

const FeatureCard = ({ title, text, icon }) => {
	return (
		<div className={classes.card}>
			<div className={classes.iconWrapper}>{icon}</div>
			<h5 className={classes.title}>{title}</h5>
			<p>{text}</p>
		</div>
	);
};

const Features = () => {
	return (
		<section className={c.section}>
			<h2 className={c.sectionTitle}>Фишки приложения</h2>
			<div className={classes.grid}>
				{ourFeatures.length &&
					ourFeatures.map((feature, index) => {
						return <FeatureCard {...feature} key={`feature${index}`} />;
					})}
			</div>
		</section>
	);
};

FeatureCard.propTypes = {
	title: PropTypes.string,
	text: PropTypes.string,
	icon: PropTypes.element,
};

export default Features;
