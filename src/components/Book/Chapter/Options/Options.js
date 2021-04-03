import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';
import classes from './Options.module.scss';

import OptionsInput from './OptionsInput/OptionsInput';

import { getIsTranslationOn, getIsEditDictionaryButtons } from '../../../../store/book/slices';
import { updateIsTranslationOn, updateIsEditDictionaryButtons } from '../../../../store/book/actions';
import { getAuthorized } from '../../../../store/app/slices';

const Options = (props) => {
	const authorized = useSelector(getAuthorized);
	const dispatch = useDispatch();
	const computedClasses = [classes.OptionsPopup];
	if (props.isOpen) {
		computedClasses.push(classes.OptionsPopupIsOpen);
	}
	const isTranslationOn = useSelector(getIsTranslationOn);
	const isEditDictionaryButtons = useSelector(getIsEditDictionaryButtons);

	const toggleTranslation = useCallback(() => {
		dispatch(updateIsTranslationOn(!isTranslationOn));
	}, [isTranslationOn]);

	const toggleEditDictionaryButtons = useCallback(() => {
		dispatch(updateIsEditDictionaryButtons(!isEditDictionaryButtons));
	}, [isEditDictionaryButtons]);

	return (
		<div className={computedClasses.join(' ')}>
			<div className={classes.OptionsSection}>
				<div className={classes.SectionItem}>
					<div className={classes.ItemLabel}>Перевод</div>
					<OptionsInput id="translation-switch" toggle={toggleTranslation} checked={isTranslationOn} />
				</div>
				<div className={classes.SectionItem} data-display={authorized ? 'show' : 'hide'}>
					<div className={classes.ItemLabel}>Добавление в словарь</div>
					<OptionsInput
						id="edit-dictionary-switch"
						toggle={toggleEditDictionaryButtons}
						checked={isEditDictionaryButtons}
					/>
				</div>
			</div>
		</div>
	);
};

Options.propTypes = {
	isOpen: PropTypes.bool.isRequired,
};

export default Options;
