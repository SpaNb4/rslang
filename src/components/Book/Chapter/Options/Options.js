import React from 'react';
import { PropTypes } from 'prop-types';
import classes from './Options.module.scss';
import { FaCheck } from 'react-icons/fa';

const Options = (props) => {
	const display = props.isOpen ? 'block' : 'none';
	return (
		<div className={classes.OptionsPopup} data-display={display}>
			<div className={classes.OptionsSection}>
				<div className={classes.SectionItem}>
					<div className={classes.ItemLabel}>Translation</div>
					<div className={classes.IconContainer}>
						<input className={classes.ItemInput} id="translationCheck" type="checkbox" />
						<FaCheck className={classes.IconCheck} />
					</div>
				</div>
			</div>
		</div>
	);
};

Options.propTypes = {
	isOpen: PropTypes.bool.isRequired,
};

export default Options;
