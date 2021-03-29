import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import AuthModal from './AuthModal/AuthModal';
import DropDown from './DropDown/DropDown';
import { login, logout, menuToggle, register } from '../../store/app/actions';
import { getMenu, getAuthorized } from '../../store/app/slices';
import {
	FaHamburger,
	FaBrain,
	FaBookDead,
	FaTableTennis,
	FaPercentage,
	FaUserGraduate,
	FaUserSecret,
	FaSignInAlt,
	FaSignOutAlt,
	FaUserPlus,
	FaGraduationCap,
} from 'react-icons/fa';
import classes from './Header.module.scss';
import { menu, LocalStorageKeys } from './../../common/constants';
import { reset } from '../../store/quiz/actions';

const Header = () => {
	const dispatch = useDispatch();

	console.log(useParams());

	const menuHidden = useSelector(getMenu);
	const auth = useSelector(getAuthorized);

	const [loginHidden, setLoginHidden] = useState(true);
	const [registerHidden, setRegisterHidden] = useState(true);

	const handleMenuToggle = useCallback(() => {
		setRegisterHidden(true);
		setLoginHidden(true);
		dispatch(menuToggle(!menuHidden));
	}, [menuHidden]);

	const handleClose = (evt) => {
		if (!menuHidden && (evt.key === 'Escape' || evt.type === 'click')) {
			dispatch(menuToggle(true));
		} else if (evt.key === 'Escape' && !registerHidden) {
			setRegisterHidden(true);
		} else if (evt.key === 'Escape' && !loginHidden) {
			setLoginHidden(true);
		}
	};

	const handleModalClose = useCallback(() => {
		setRegisterHidden(true);
		setLoginHidden(true);
	}, []);

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

	const handleQuizReset = useCallback(() => {
		dispatch(reset());
	});

	useEffect(() => {
		if (auth) {
			setRegisterHidden(true);
			setLoginHidden(true);
		}
	}, [auth]);

	useEffect(() => {
		if (!menuHidden || !loginHidden || !registerHidden) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
	}, [menuHidden, loginHidden, registerHidden]);

	useEffect(() => {
		document.addEventListener('keydown', handleClose);
		document.addEventListener('click', handleClose);
		return () => {
			document.removeEventListener('keydown', handleClose);
			document.removeEventListener('click', handleClose);
		};
	}, [menuHidden, loginHidden, registerHidden]);

	return (
		<>
			<header className={classes.header}>
				<nav className={classes.nav} onClick={(evt) => evt.stopPropagation()}>
					<button
						type="button"
						className={classes.navLink}
						aria-label="toggle sidebar"
						onClick={handleMenuToggle}
					>
						<FaHamburger />
					</button>
					<Link to="/" onClick={handleClose} className={classes.homeLink}>
						<h2>RS Lang</h2>
					</Link>
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
								<DropDown array={menu.games} name="Тренировки" icon={<FaTableTennis />} />
							</li>
							<li className={classes.menuItem}>
								<Link className={classes.menuLink} to="/">
									<FaPercentage />
									<span>Статистика</span>
								</Link>
							</li>
							<li className={classes.menuItem}>
								<Link className={classes.menuLink} to="/quiz" onClick={handleQuizReset}>
									<FaGraduationCap />
									<span>Викторина</span>
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
								<>
									<li className={classes.menuItem}>
										<Link className={classes.menuLink} onClick={handleRegisterOpen} to="/">
											<FaUserPlus />
											<span>Регистрация</span>
										</Link>
									</li>
									<li className={classes.menuItem}>
										<Link className={classes.menuLink} onClick={handleLoginOpen} to="/">
											<FaSignInAlt />
											<span>Вход</span>
										</Link>
									</li>
								</>
							)}
						</ul>
					</div>
					{auth ? <FaUserGraduate size={24} /> : <FaUserSecret size={24} />}
				</nav>
			</header>
			<AuthModal
				hidden={loginHidden}
				buttonName="Войти"
				title="Вход"
				callback={login}
				handleClose={handleModalClose}
			/>
			<AuthModal
				hidden={registerHidden}
				buttonName="Зарегистрироваться"
				title="Регистрация"
				reg
				callback={register}
				handleClose={handleModalClose}
			/>
		</>
	);
};

export default Header;
