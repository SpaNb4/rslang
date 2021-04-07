import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import { FaCamera, FaTimes } from 'react-icons/fa';
import classes from './AuthModal.module.scss';
import { globalClasses as c } from '../../../common/constants';
import { updateAttempts } from '../../../common/helpers';
import { getAuthLoading } from '../../../store/app/slices';

const AuthModal = ({ hidden, buttonName, callback, reg, title, handleClose, errorMessage }) => {
	const dispatch = useDispatch();
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [image, setImage] = useState(null);
	const loading = useSelector(getAuthLoading);

	const usernameRef = useRef(null);
	const emailRef = useRef(null);
	const passwordRef = useRef(null);
	const uploadRef = useRef(null);
	const uploadBtnRef = useRef(null);

	const handleSubmit = (evt) => {
		evt.preventDefault();

		if (reg && !username.trim()) {
			usernameRef.current.dataset.error = 'true';
		} else if (!email.trim()) {
			emailRef.current.dataset.error = 'true';
		} else if (!password.trim()) {
			passwordRef.current.dataset.error = 'true';
		} else if (reg && !image) {
			uploadBtnRef.current.dataset.error = 'true';
		} else {
			dispatch(callback(email, password, username, image));
			updateAttempts();
		}
	};

	const handleFocus = () => {
		if (reg) {
			usernameRef.current.dataset.error = 'false';
			uploadBtnRef.current.dataset.error = 'false';
		}
		emailRef.current.dataset.error = 'false';
		passwordRef.current.dataset.error = 'false';
	};

	const handleUsernameChange = (evt) => {
		setUsername(evt.target.value);
	};

	const handleEmailChange = (evt) => {
		setEmail(evt.target.value);
	};

	const handlePasswordChange = (evt) => {
		setPassword(evt.target.value);
	};

	const handleFileUpload = (evt) => {
		setImage(evt.target.files[0]);
	};

	const handleClick = () => {
		uploadRef.current.click();
	};

	const errorAlertClasses = errorMessage
		? [classes.errorAlert, classes.errorAlertExists].join(' ')
		: classes.errorAlert;

	return (
		<div className={classes.overlay} aria-hidden={hidden}>
			<div className={classes.modal} role="dialog">
				<button className={classes.closeButton} type="button" onClick={handleClose}>
					<FaTimes />
				</button>
				<h2 className={classes.title}>{title}</h2>
				{loading && (
					<div className={classes.loader}>
						<div></div>
						<div></div>
					</div>
				)}
				<div className={errorAlertClasses}>{errorMessage && errorMessage}</div>
				<form autoComplete="false" name="form" onSubmit={handleSubmit}>
					{reg && (
						<fieldset className={classes.fieldset}>
							<label htmlFor="username" className={c.visuallyHidden}>
								Имя
							</label>
							<input
								value={username}
								placeholder="Имя"
								type="text"
								className={classes.input}
								name="username"
								onChange={handleUsernameChange}
								onFocus={handleFocus}
								data-error="false"
								ref={usernameRef}
							/>
						</fieldset>
					)}

					<fieldset className={classes.fieldset}>
						<label htmlFor="email" className={c.visuallyHidden}>
							Логин
						</label>
						<input
							value={email}
							placeholder="Почта"
							type="email"
							className={classes.input}
							name="email"
							onChange={handleEmailChange}
							onFocus={handleFocus}
							data-error="false"
							ref={emailRef}
						/>
					</fieldset>

					<fieldset className={classes.fieldset}>
						<label htmlFor="password" className={c.visuallyHidden}>
							Пароль
						</label>
						<input
							value={password}
							placeholder="Пароль"
							type="password"
							autoComplete="on"
							className={classes.input}
							name="password"
							onChange={handlePasswordChange}
							onFocus={handleFocus}
							data-error="false"
							ref={passwordRef}
						/>
					</fieldset>

					{reg && (
						<React.Fragment>
							<input
								ref={uploadRef}
								onChange={handleFileUpload}
								type="file"
								style={{ display: 'none' }}
								accept="image/*"
							/>
							<button
								ref={uploadBtnRef}
								type="button"
								aria-label="add picture"
								data-error="false"
								className={classes.inputButton}
								onClick={handleClick}
							>
								<FaCamera />
							</button>
						</React.Fragment>
					)}

					<button type="submit" aria-label={callback.name} className={classes.button}>
						{buttonName}
					</button>
				</form>
			</div>
		</div>
	);
};

AuthModal.propTypes = {
	hidden: PropTypes.bool,
	reg: PropTypes.bool,
	callback: PropTypes.func,
	handleClose: PropTypes.func,
	buttonName: PropTypes.string,
	title: PropTypes.string,
	errorMessage: PropTypes.string,
};

export default React.memo(AuthModal);
