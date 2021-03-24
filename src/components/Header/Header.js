import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import AuthModal from './AuthModal/AuthModal';
import { login, logout, menuToggle, register } from '../../store/app/actions';
import { getMenu, getAuthorized } from '../../store/app/slices';
import {
	FaHamburger,
	FaBrain,
	FaBookDead,
	FaTableTennis,
	FaPercentage,
	FaAngleDown,
	FaUserGraduate,
	FaUserSecret,
	FaSignInAlt,
	FaSignOutAlt,
	FaHome,
} from 'react-icons/fa';
import classes from './Header.module.scss';
import { menu, LocalStorageKeys } from './../../common/constants';

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

const Header = () => {
	const dispatch = useDispatch();

	const menuHidden = useSelector(getMenu);
	const auth = useSelector(getAuthorized);

	const [loginHidden, setLoginHidden] = useState(true);
	const [registerHidden, setRegisterHidden] = useState(true);

	const handleMenuToggle = useCallback(() => {
		setRegisterHidden(true);
		setLoginHidden(true);
		dispatch(menuToggle(!menuHidden));
	}, [menuHidden]);

	const handleModalClose = (evt) => {
		if (evt.key === 'Escape' || evt.type === 'click') {
			switch (false) {
				case loginHidden:
					setLoginHidden(true);
					break;
				case registerHidden:
					setRegisterHidden(true);
					break;
				case menuHidden:
					dispatch(menuToggle(true));
					break;
			}
		}
	};

	useEffect(() => {
		if (!menuHidden || !loginHidden || !registerHidden) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
	}, [menuHidden, loginHidden, registerHidden]);

	const handleLoginOpen = useCallback(() => {
		setRegisterHidden(true);
		setLoginHidden(false);
		dispatch(menuToggle(true));
	}, [setLoginHidden]);

	const handleRegisterOpen = useCallback(() => {
		setLoginHidden(true);
		setRegisterHidden(false);
		dispatch(menuToggle(true));
	}, [setRegisterHidden]);

	const handleLogout = useCallback(() => {
		localStorage.removeItem(LocalStorageKeys.User);

		dispatch(logout());

		// close menu
		dispatch(menuToggle(true));
	}, []);

	useEffect(() => {
		document.addEventListener('keydown', handleModalClose);
		document.addEventListener('click', handleModalClose);
		return () => {
			document.removeEventListener('keydown', handleModalClose);
			document.removeEventListener('click', handleModalClose);
		};
	}, [menuHidden, loginHidden, registerHidden]);

	return (
		<React.Fragment>
			<header className={classes.header}>
				<nav className={classes.nav} onClick={(evt) => evt.stopPropagation()}>
					<Link to="/" className={classes.navLink} onClick={handleModalClose}>
						<FaHome />
					</Link>
					<button
						type="button"
						className={classes.navLink}
						aria-label="toggle sidebar"
						onClick={handleMenuToggle}
					>
						<FaHamburger />
					</button>
					<h2 className={classes.title}>RS Lang</h2>
					<div className={classes.menuWrapper} aria-hidden={menuHidden}>
						<ul className={classes.menu}>
							{auth && (
								<li className={classes.menuItem}>
									<DropDown array={menu.dictionary} name="Мой словарь" icon={<FaBookDead />} />
								</li>
							)}
							<li className={classes.menuItem}>
								<DropDown array={menu.sections} name="Учебник" icon={<FaBrain />} />
							</li>
							<li className={classes.menuItem}>
								<DropDown array={menu.sections} name="Тренировки" icon={<FaTableTennis />} />
							</li>
							<li className={classes.menuItem}>
								<Link className={classes.menuLink} to="/">
									<FaPercentage />
									<span>Статистика</span>
								</Link>
							</li>
							{auth ? (
								<li className={classes.menuItem}>
									<Link className={classes.menuLink} onClick={handleLogout} to="/">
										<FaSignOutAlt />
										<span>Выход</span>
									</Link>
								</li>
							) : (
								<React.Fragment>
									<li className={classes.menuItem}>
										<Link className={classes.menuLink} onClick={handleRegisterOpen} to="/">
											<FaSignInAlt />
											<span>Регистрация</span>
										</Link>
									</li>
									<li className={classes.menuItem}>
										<Link className={classes.menuLink} onClick={handleLoginOpen} to="/">
											<FaSignInAlt />
											<span>Вход</span>
										</Link>
									</li>
								</React.Fragment>
							)}
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
			<AuthModal hidden={loginHidden} buttonName="Войти" title="Вход" callback={login} />
			<AuthModal
				hidden={registerHidden}
				buttonName="Зарегистрироваться"
				title="Регистрация"
				reg
				callback={register}
			/>
		</React.Fragment>
	);
};

DropDownItem.propTypes = {
	listName: PropTypes.string,
	linkName: PropTypes.string,
	linkId: PropTypes.string,
};

DropDown.propTypes = {
	array: PropTypes.array,
	name: PropTypes.string,
	icon: PropTypes.element,
};

export default Header;
