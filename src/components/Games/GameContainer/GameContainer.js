import React from 'react';
import classes from './GameContainer.module.scss';
import { PropTypes } from 'prop-types';
import GameOverlay from './../GameOverlay/GameOverlay';

function GameContainer({ children }) {
	return (
		<GameOverlay>
			<div className={classes.gameContainer}>{children}</div>
		</GameOverlay>
	);
}

GameContainer.propTypes = {
	children: PropTypes.node.isRequired,
};

export default GameContainer;
