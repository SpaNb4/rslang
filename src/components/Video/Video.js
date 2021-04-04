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
					Хорошие новости! Наше приложение содержит 3600 часто употребляемых английских слов, которые вы
					можете выучить совершенно бесплатно. У нас есть учебник в котором содержится не только перевод
					слова, но и пример его употребления в повседневной жизни. А также вы можете закрепить ваши знания на
					практике. Например, поиграть в любую из наших игр: &quot;Саванна&quot;, &quot;Спринт&quot;,
					&quot;Аудиовызов&quot; и бонусная &quot;Конструктор&quot;. Что бы вы могли отслеживать свои
					результаты у нас есть страница статистики. Если вы зарегистрируетесь, то сможете управлять своим
					словарём. А если подзабыли изученные слова, то „Викторина“ поможет освежить ваши знания. Учите
					вместе с нами!
				</p>
			</div>
		</section>
	);
};

export default Video;
