import React from 'react';
import { Link } from 'react-router-dom';
import classes from './GamesList.module.scss';
import menuClasses from '../Header/Header.module.scss';
import { menu } from '../../common/constants';
import { PropTypes } from 'prop-types';

function GamesList({ words, page }) {
	return (
		<div className={classes.gamesListContainer}>
			<ul className={classes.gamesList}>
				{menu.games.map(({ listName, linkName, linkId, icon, color }, index) => {
					return (
						<li className={[menuClasses.menuItem, classes.gamesListItem].join(' ')} key={index}>
							<Link
								className={[menuClasses.menuLink, menuClasses.innerLink, classes.listItemLink].join(
									' '
								)}
								to={{
									pathname: `/${listName}/${linkId}`,
									state: {
										words,
										page,
									},
								}}
								data-color={color}
							>
								{icon}
								<span>{linkName}</span>
							</Link>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

GamesList.propTypes = {
	words: PropTypes.array.isRequired,
	page: PropTypes.number.isRequired,
};

export default GamesList;
