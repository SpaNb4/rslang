import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import classes from './UserProfileIcon.module.scss';
import { FaUserGraduate } from 'react-icons/fa';

import { LocalStorageKeys } from '../../../common/constants';
import { getAuthorized } from '../../../store/app/slices';

function UserProfileIcon() {
	const authorized = useSelector(getAuthorized);
	const [imageSrc, setImageSrc] = useState('');

	useEffect(() => {
		const imageSrc = localStorage.getItem(LocalStorageKeys.Avatar) || '';
		if (authorized && imageSrc) {
			setImageSrc(JSON.parse(imageSrc));
		}
	}, [authorized]);

	const icon = imageSrc ? (
		<div
			className={classes.iconContainer}
			style={{
				background: `no-repeat center/cover url(${imageSrc})`,
			}}
		/>
	) : (
		<FaUserGraduate />
	);

	return <React.Fragment>{icon}</React.Fragment>;
}

export default React.memo(UserProfileIcon);
