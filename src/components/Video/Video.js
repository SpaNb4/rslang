import React from 'react';
import classes from './Video.module.scss';
import { VIDEO_SRC, SECTION_TITLE } from '../../common/constants';

const Video = () => {
	return (
		<section className={classes.root}>
			<h2 className={SECTION_TITLE}>О приложении RS Lang</h2>
			<div className={classes.video}>
				<iframe
					width="853"
					height="480"
					src={VIDEO_SRC}
					frameBorder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
					title="Embedded youtube"
				/>
			</div>
		</section>
	);
};

export default Video;
