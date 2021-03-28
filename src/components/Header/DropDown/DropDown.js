import React, { useState, useCallback } from 'react';
import { PropTypes } from 'prop-types';
import DropDownItem from './DropDownItem';
import { FaAngleDown } from 'react-icons/fa';
import classes from '../Header.module.scss';

const DropDown = ({ array, name, icon }) => {
	const [hiddenDropdown, setHiddenDropdown] = useState(true);

	const handleDropdownToggle = useCallback(
		(evt) => {
			evt.preventDefault();
			setHiddenDropdown((prev) => !prev);
		},
		[hiddenDropdown]
	);

	const dropDownItems =
		array.length &&
		array.map((item, index) => (
			<DropDownItem listName={item.listName} linkName={item.linkName} linkId={item.linkId} key={index} />
		));

	return (
		<>
			<a href="#" className={classes.menuLink} aria-label="toggle dropdown" onClick={handleDropdownToggle}>
				{icon}
				<span>{name}</span>
				<span className={classes.dropToggle} aria-expanded={hiddenDropdown}>
					<FaAngleDown />
				</span>
			</a>
			<ul className={classes.dropdown} aria-expanded={hiddenDropdown}>
				{dropDownItems}
			</ul>
		</>
	);
};

DropDown.propTypes = {
	array: PropTypes.array,
	name: PropTypes.string,
	icon: PropTypes.element,
};

export default DropDown;
