import React from 'react';
import { PropTypes } from 'prop-types';
import { TEAM_MATES, SECTION_TITLE } from '../../common/constants';
import classes from './Team.module.scss';

const TeamCard = ({ name, src, quote }) => {
	return (
		<div className={classes.card}>
			<div className={classes.avatar}>
				<img src={src} alt={`фотография ${name}`} />
			</div>
			<div>
				<h5 className={classes.name}>{name}</h5>
				<p>{quote}</p>
			</div>
		</div>
	);
};

const Team = () => {
	return (
		<section className={classes.team}>
			<h2 className={SECTION_TITLE}>Наша команда</h2>
			<div className={classes.grid}>
				{TEAM_MATES.length &&
					TEAM_MATES.map((mate, index) => {
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
};

export default Team;
