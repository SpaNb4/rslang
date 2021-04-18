import React from 'react';
import { PropTypes } from 'prop-types';
import { FaGithubAlt } from 'react-icons/fa';
import classes from './Footer.module.scss';
import logo from '../../assets/images/logo_rs.png';

const footerGithubs = [
	{
		href: 'AlesyaKuptsova',
		title: 'Alesya',
	},
	{
		href: 'kovalenkoiryna15',
		title: 'Ira',
	},
	{
		href: 'SpaNb4',
		title: 'Dima',
	},
	{
		href: 'magklax',
		title: 'Nadia',
	},
];

const GitHub = ({ href, title }) => {
	return (
		<li className={classes.item}>
			<a
				href={`https://github.com/${href}`}
				className={classes.link}
				target="_blank"
				rel="noreferrer"
				title={title}
			>
				<FaGithubAlt className={classes.icon} />
			</a>
		</li>
	);
};

const Footer = () => {
	return (
		<footer className={classes.root}>
			<div className={classes.wrapper}>
				<ul className={classes.list}>
					{footerGithubs.length &&
						footerGithubs.map((github, index) => {
							return <GitHub {...github} key={`github${index}`} />;
						})}
				</ul>
				<div className={classes.copyright}>
					<p className={classes.date}>&copy; {new Date().getFullYear()}</p>
					<a href="https://rs.school/js/" className={classes.logo} target="_blank" rel="noreferrer">
						<img src={logo} alt="rs school logo" width={100} height={50} className="rsschool-logo__img" />
					</a>
				</div>
			</div>
		</footer>
	);
};

GitHub.propTypes = {
	href: PropTypes.string,
	title: PropTypes.string,
};

export default Footer;
