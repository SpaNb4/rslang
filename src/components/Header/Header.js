import React, { useState, useCallback, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import {
	FaHamburger,
	FaBookDead,
	FaTableTennis,
	FaPercentage,
	FaAngleDown,
	FaUserGraduate,
	FaUserSecret,
	FaSignInAlt,
	FaSignOutAlt,
} from 'react-icons/fa';
import classes from './Header.module.scss';

import { BOOK_SECTIONS, GAMES } from './../../common/constants';

const DropDownItem = ({ listName, linkName, linkId }) => {
	return (
		<li className={classes.menuItem}>
			<Link className={classes.menuLink} to={`/${listName}/${linkId}`}>
				<span>{linkName}</span>
			</Link>
		</li>
	);
};

const DropDown = ({ array }) => {
	const [hiddenDropdown, setHiddenDropdown] = useState(true);

	const handleDropdownToggle = useCallback(() => {
		setHiddenDropdown((prev) => !prev);
	}, [hiddenDropdown]);

	return (
		<>
			<button
				className={classes.dropToggle}
				type="button"
				aria-label="toggle dropdown"
				aria-expanded={hiddenDropdown}
				onClick={handleDropdownToggle}
			>
				<FaAngleDown />
			</button>
			<ul className={classes.dropdown} aria-expanded={hiddenDropdown}>
				{array.length &&
					array.map((item, index) => (
						<DropDownItem
							listName={item.listName}
							linkName={item.linkName}
							linkId={item.linkId}
							key={index}
						/>
					))}
			</ul>
		</>
	);
};

const Header = () => {
	const [auth, setAuth] = useState(true);
	const [hiddenMenu, setHiddenMenu] = useState(true);

	const handleLogout = useCallback(() => {
		setHiddenMenu(true);
		setAuth(false);
	}, []);

	const handleLogin = useCallback(() => {
		setHiddenMenu(true);
		//open popup ???
		setAuth(true);
	}, []);

	const handleMenuToggle = useCallback(() => {
		setHiddenMenu((prev) => !prev);
	}, [hiddenMenu]);

	const handleMenuClose = useCallback(
		(evt) => {
			if (!hiddenMenu && (evt.key === 'Escape' || evt.type === 'click')) {
				setHiddenMenu(true);
			}
		},
		[setHiddenMenu]
	);

	useEffect(() => {
		document.addEventListener('keydown', handleMenuClose);
		document.addEventListener('click', handleMenuClose);
		return () => {
			document.removeEventListener('keydown', handleMenuClose);
			document.removeEventListener('click', handleMenuClose);
		};
	}, []);

	return (
		<header className={classes.header}>
			<nav className={classes.nav} onClick={(evt) => evt.stopPropagation()}>
				<button
					type="button"
					className={[classes.hamburger, classes.navLink].join(' ')}
					aria-label="toggle sidebar"
					onClick={handleMenuToggle}
				>
					<FaHamburger />
				</button>
				<h2 className={classes.title}>RS Lang</h2>
				<div className={classes.menuWrapper} aria-hidden={hiddenMenu}>
					<ul className={classes.menu}>
						<li className={classes.menuItem}>
							<Link className={classes.menuLink} to="/book/0">
								<FaBookDead />
								<span>Учебник</span>
							</Link>
							<DropDown array={BOOK_SECTIONS} />
						</li>
						<li className={classes.menuItem}>
							<Link className={classes.menuLink} to="/">
								<FaTableTennis />
								<span>Тренировки</span>
							</Link>
							<DropDown array={GAMES} />
						</li>
						<li className={classes.menuItem}>
							<Link className={classes.menuLink} to="/">
								<FaPercentage />
								<span>Статистика</span>
							</Link>
						</li>
						<li className={classes.menuItem}>
							{auth ? (
								<Link className={classes.menuLink} onClick={handleLogout} to="/">
									<FaSignOutAlt />
									<span>Выход</span>
								</Link>
							) : (
								<Link className={classes.menuLink} onClick={handleLogin} to="/">
									<FaSignInAlt />
									<span>Вход/Регистрация</span>
								</Link>
							)}
						</li>
					</ul>
				</div>
				{auth ? (
					<Link className={classes.navLink} to="/profile/:id">
						<FaUserGraduate />
					</Link>
				) : (
					<Link className={classes.navLink} to="/">
						<FaUserSecret />
					</Link>
				)}
			</nav>
		</header>
	);
};

DropDownItem.propTypes = {
	listName: PropTypes.string,
	linkName: PropTypes.string,
	linkId: PropTypes.string,
};

DropDown.propTypes = {
	array: PropTypes.array,
};

export default Header;
