import React from 'react';
import classes from './Video.module.scss';
import { globalClasses as c, ExternalUrls } from '../../common/constants';

const Video = () => {
	return (
		<section className={c.section}>
			<h2 className={c.sectionTitle}>О приложении RS Lang</h2>
			<div className={classes.wrapper}>
				<div className={classes.video}>
					<iframe
						width="853"
						height="480"
						src={ExternalUrls.Video}
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
						title="Embedded youtube"
					/>
				</div>
				<p className={classes.text}>
					Идейные соображения высшего порядка, а также укрепление и развитие структуры позволяет выполнять
					важные задания по разработке соответствующий условий активизации. Повседневная практика показывает,
					что реализация намеченных плановых заданий требуют определения и уточнения модели развития.
				</p>
			</div>
		</section>
	);
};

export default Video;
