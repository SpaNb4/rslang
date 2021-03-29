import React from 'react';
import { PropTypes } from 'prop-types';
import classes from './OptionsInput.module.scss';

const OptionsInput = (props) => {
	return (
		<div className={classes.InputContainer}>
			<input
				className={classes.Input}
				type="checkbox"
				id="switch"
				checked={props.checked}
				onChange={props.toggle}
			/>
			<label className={classes.Label} htmlFor="switch" />
		</div>
	);
};

OptionsInput.propTypes = {
	checked: PropTypes.bool.isRequired,
	toggle: PropTypes.func.isRequired,
};

export default OptionsInput;
