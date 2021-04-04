import React from 'react';
import { PropTypes } from 'prop-types';
import { FaSlidersH } from 'react-icons/fa';
import classes from './OptionsControl.module.scss';

const OptionsControl = (props) => {
	return (
		<button className={classes.OptionsControl} type="button" onClick={props.openOptions}>
			<FaSlidersH className={classes.IconOptionsControl} />
		</button>
	);
};

OptionsControl.propTypes = {
	openOptions: PropTypes.func.isRequired,
};

export default React.memo(OptionsControl);
