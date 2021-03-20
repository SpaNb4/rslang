import React from 'react';
import { PropTypes } from 'prop-types';
import classes from './Team.module.scss';

const TEAM_MATES = ['Nadia', 'Alesia', 'Dima', 'Ira'];

const TeamCard = ({ name }) => {
	return (
		<div className={classes.card}>
			<div className={classes.avatar}>
				<img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw" />
			</div>
			<div>
				<h5 className={classes.title}>{name}</h5>
				<p>
					“Are own design entire former get should. Advantages boisterous day excellence. Out between our two
					waiting wishing”.
				</p>
			</div>
		</div>
	);
};

const Team = () => {
	return (
		<section className={classes.team}>
			{TEAM_MATES.length &&
				TEAM_MATES.map((name, index) => {
					return <TeamCard name={name} key={`teammate-${index}`} />;
				})}
		</section>
	);
};

TeamCard.propTypes = {
	name: PropTypes.string,
};

export default Team;
