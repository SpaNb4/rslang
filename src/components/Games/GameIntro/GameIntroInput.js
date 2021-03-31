import React from 'react';
import { PropTypes } from 'prop-types';
import classes from './GameIntro.module.scss';

const GameIntroInput = ({ level, handleChange, checked }) => (
	<label>
		<input type="radio" name="level" value={level} onChange={handleChange} defaultChecked={checked} />
		<span className={classes.checkmark}>{level}</span>
	</label>
);

GameIntroInput.propTypes = {
	level: PropTypes.number,
	handleChange: PropTypes.func,
	checked: PropTypes.bool,
};

export default GameIntroInput;
