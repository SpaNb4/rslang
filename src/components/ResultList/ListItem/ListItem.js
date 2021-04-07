import React from 'react';
import { PropTypes } from 'prop-types';
import menuClasses from '../../Header/Header.module.scss';
import classes from './ListItem.module.scss';

const ListItem = ({ wordData, trained, linkName, icon, color, linkId }) => (
	<li className={[menuClasses.menuItem, classes.gamesListItem].join(' ')}>
		<div
			className={[menuClasses.menuLink, menuClasses.innerLink, classes.listItemLink].join(' ')}
			data-color={color}
		>
			<div className={classes.gameTitle}>
				<div>{icon}</div>
				<div>{linkName}</div>
			</div>
			{trained ? (
				<div className={classes.gameAnswers}>
					<div>Правильно: {wordData.userWord.optional[linkId].correct}</div>
					<div>Неправильно: {wordData.userWord.optional[linkId].wrong}</div>
				</div>
			) : (
				<div className={classes.gameAnswers}>Не изучено</div>
			)}
		</div>
	</li>
);

ListItem.propTypes = {
	trained: PropTypes.bool.isRequired,
	linkName: PropTypes.string.isRequired,
	icon: PropTypes.node.isRequired,
	color: PropTypes.string.isRequired,
	linkId: PropTypes.string.isRequired,
	wordData: PropTypes.shape({
		userWord: PropTypes.shape({
			optional: PropTypes.shape({
				word: PropTypes.string,
			}),
		}),
	}).isRequired,
};

export default ListItem;
