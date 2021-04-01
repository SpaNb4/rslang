import React from 'react';
import { PropTypes } from 'prop-types';
import classes from './Button.module.scss';

function Button(props) {
	return (
		<button
			type="button"
			onClick={props.handler}
			className={classes.Button}
			disabled={props.disabled}
			difficulty={props.difficulty}
			data-color={props.color}
		>
			{props.children}
		</button>
	);
}

Button.propTypes = {
	children: PropTypes.node.isRequired,
	handler: PropTypes.func.isRequired,
	difficulty: PropTypes.string,
	color: PropTypes.string,
	disabled: PropTypes.bool,
};

export default Button;
