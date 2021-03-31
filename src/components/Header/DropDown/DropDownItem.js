import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { menuToggle } from '../../../store/app/actions';
import classes from '../Header.module.scss';
import { loadGame } from '../../../store/game/actions';

const DropDownItem = ({ listName, linkName, linkId, icon, color }) => {
	const dispatch = useDispatch();
	const { pathname } = useLocation();
	const [current, setCurrent] = useState(false);
	const link = `/${listName}/${linkId}=true`;

	useEffect(() => setCurrent(pathname.includes(link)), [pathname]);

	const handleClick = () => {
		dispatch(menuToggle(false));
		dispatch(loadGame());
	};

	return (
		<li className={classes.menuItem}>
			<Link
				className={[classes.menuLink, classes.innerLink].join(' ')}
				to={link}
				onClick={handleClick}
				aria-current={current}
				data-color={color}
			>
				{icon}
				<span>{linkName}</span>
			</Link>
		</li>
	);
};

DropDownItem.propTypes = {
	listName: PropTypes.string,
	linkName: PropTypes.string,
	linkId: PropTypes.string,
	icon: PropTypes.element,
	color: PropTypes.string,
};

export default DropDownItem;
