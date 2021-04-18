import React from 'react';
import { PropTypes } from 'prop-types';
import { ourTeammates, globalClasses as c } from '../../common/constants';
import classes from './Team.module.scss';

const TeamCard = ({ name, src, quote, githubLink }) => {
	return (
		<a className={classes.card} href={githubLink} target="blank">
			<div className={classes.avatar}>
				<img src={src} alt={`фотография ${name}`} />
			</div>
			<div>
				<h5 className={classes.name}>{name}</h5>
				<p>{quote}</p>
			</div>
		</a>
	);
};

const Team = () => {
	return (
		<section className={c.section}>
			<h2 className={c.sectionTitle}>Наша команда</h2>
			<div className={classes.grid}>
				{ourTeammates.length &&
					ourTeammates.map((mate, index) => {
						return <TeamCard {...mate} key={`teammate-${index}`} />;
					})}
			</div>
		</section>
	);
};

TeamCard.propTypes = {
	name: PropTypes.string,
	src: PropTypes.string,
	quote: PropTypes.string,
	fine: PropTypes.string,
	githubLink: PropTypes.string,
};

export default Team;
