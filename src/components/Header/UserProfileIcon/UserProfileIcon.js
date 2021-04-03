import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import classes from './UserProfileIcon.module.scss';
import { FaUserGraduate, FaUserSecret } from 'react-icons/fa';

function UserProfileIcon({ authorized, userImageSrc }) {
	const [imageSrc, setImageSrc] = useState('');

	useEffect(() => {
		if (authorized && userImageSrc) {
			setImageSrc(userImageSrc);
		} else {
			setImageSrc('');
		}
	}, [authorized, userImageSrc]);

	const icon = authorized ? (
		<>{imageSrc ? <img src={imageSrc} /> : <FaUserGraduate size={24} />}</>
	) : (
		<FaUserSecret size={24} />
	);

	return <div className={classes.iconContainer}>{icon}</div>;
}

UserProfileIcon.propTypes = {
	authorized: PropTypes.bool.isRequired,
	userImageSrc: PropTypes.string,
};

export default React.memo(UserProfileIcon);
