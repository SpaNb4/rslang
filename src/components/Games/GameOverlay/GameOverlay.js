import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { BsArrowsFullscreen, BsFullscreenExit } from 'react-icons/bs';
import classes from './GameOverlay.module.scss';

function GameOverlay({ children }) {
	const [isFullScreen, setIsFullScreen] = useState(true);
	let element = null;

	useEffect(() => {
		element = document.querySelector('[fullscreen]');

		element.addEventListener('fullscreenchange', () => {
			if (document.fullscreenElement) {
				setIsFullScreen(false);
			} else {
				setIsFullScreen(true);
			}
		});

		return () => {
			element.removeEventListener('fullscreenchange', fullScreenClickHandler);
		};
	}, []);

	function fullScreenClickHandler() {
		if (document.fullscreenElement) {
			document.exitFullscreen();
		} else {
			fullScreen(element);
		}
	}

	function fullScreen(element) {
		if (element.requestFullscreen) {
			element.requestFullscreen();
		} else if (element.webkitrequestFullscreen) {
			element.webkitRequestFullscreen();
		} else if (element.mozRequestFullscreen) {
			element.mozRequestFullScreen();
		}
	}

	return (
		<div className={classes.fullScreenWrapper} fullscreen="true">
			{children}
			{isFullScreen ? (
				<BsArrowsFullscreen onClick={fullScreenClickHandler} className={classes.fullScreenBtn} />
			) : (
				<BsFullscreenExit onClick={fullScreenClickHandler} className={classes.fullScreenBtn} />
			)}
		</div>
	);
}

GameOverlay.propTypes = {
	children: PropTypes.node.isRequired,
};

export default GameOverlay;
