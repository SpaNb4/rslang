import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import classes from './UserProfileIcon.module.scss';
import { FaUserGraduate } from 'react-icons/fa';

function UserProfileIcon({ authorized, userImageSrc }) {
	const [imageSrc, setImageSrc] = useState('');

	useEffect(() => {
		if (authorized && userImageSrc) {
			setImageSrc(userImageSrc);
		} else {
			setImageSrc('');
		}
	}, [authorized, userImageSrc]);

	const icon = imageSrc ? (
		<div
			className={classes.iconContainer}
			style={{
				background: `no-repeat center/cover url(${imageSrc})`,
			}}
		/>
	) : (
		<FaUserGraduate size={24} />
	);

	return <React.Fragment>{icon}</React.Fragment>;
}

UserProfileIcon.propTypes = {
	authorized: PropTypes.bool.isRequired,
	userImageSrc: PropTypes.string,
};

export default React.memo(UserProfileIcon);
