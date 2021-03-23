import React from 'react';
import { PropTypes } from 'prop-types';
import classes from './Button.module.scss';

function Button(props) {
	return (
		<button
			type="button"
			onClick={props.handler}
			className={classes.button}
			disabled={props.disabled}
			difficulty={props.difficulty}
		>
			{props.children}
		</button>
	);
}

Button.propTypes = {
	children: PropTypes.node.isRequired,
	handler: PropTypes.func.isRequired,
	difficulty: PropTypes.string,
	disabled: PropTypes.bool,
};

export default Button;
