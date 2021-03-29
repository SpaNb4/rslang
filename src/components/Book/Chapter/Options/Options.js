import React, { useState, useCallback } from 'react';
import { PropTypes } from 'prop-types';
import classes from './Options.module.scss';

import OptionsInput from './OptionsInput';

const Options = (props) => {
	const computedClasses = [classes.OptionsPopup];
	if (props.isOpen) {
		computedClasses.push(classes.OptionsPopupIsOpen);
	}
	const [isTranslationOn, setIsTranslationOn] = useState(true);

	const toggleTranslation = useCallback(() => {
		setIsTranslationOn(!isTranslationOn);
	}, [isTranslationOn]);

	return (
		<div className={computedClasses.join(' ')}>
			<div className={classes.OptionsSection}>
				<div className={classes.SectionItem}>
					<div className={classes.ItemLabel}>Translation</div>
					<OptionsInput toggle={toggleTranslation} checked={isTranslationOn} />
				</div>
			</div>
		</div>
	);
};

Options.propTypes = {
	isOpen: PropTypes.bool.isRequired,
};

export default Options;
