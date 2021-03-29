import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';
import classes from './Options.module.scss';

import OptionsInput from './OptionsInput';

import { getIsTranslationOn } from '../../../../store/book/slices';
import { updateIsTranslationOn } from '../../../../store/book/actions';

const Options = (props) => {
	const dispatch = useDispatch();
	const computedClasses = [classes.OptionsPopup];
	if (props.isOpen) {
		computedClasses.push(classes.OptionsPopupIsOpen);
	}
	const isTranslationOn = useSelector(getIsTranslationOn);

	const toggleTranslation = useCallback(() => {
		dispatch(updateIsTranslationOn(!isTranslationOn));
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
