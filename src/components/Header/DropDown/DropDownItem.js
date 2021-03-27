import React from 'react';
import { PropTypes } from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { menuToggle } from '../../../store/app/actions';

import classes from '../Header.module.scss';

const DropDownItem = ({ listName, linkName, linkId }) => {
	const dispatch = useDispatch();

	const handleClick = () => {
		dispatch(menuToggle(false));
	};

	return (
		<li className={classes.menuItem}>
			<Link className={classes.menuLink} to={`/${listName}/${linkId}`} onClick={handleClick}>
				<span>{linkName}</span>
			</Link>
		</li>
	);
};

DropDownItem.propTypes = {
	listName: PropTypes.string,
	linkName: PropTypes.string,
	linkId: PropTypes.string,
};

export default DropDownItem;
