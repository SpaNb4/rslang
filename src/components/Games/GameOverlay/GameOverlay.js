import React, { useState, useRef } from 'react';
import { PropTypes } from 'prop-types';
import { BsArrowsFullscreen, BsFullscreenExit } from 'react-icons/bs';
import screenfull from 'screenfull';
import classes from './GameOverlay.module.scss';

function GameOverlay({ children }) {
	const [isFullScreen, setIsFullScreen] = useState(false);
	const overlayRef = useRef(null);

	function fullScreenClickHandler() {
		screenfull.toggle(overlayRef.current);
		setIsFullScreen(!isFullScreen);
	}

	return (
		<div className={classes.fullScreenWrapper} ref={overlayRef}>
			{children}
			{isFullScreen ? (
				<BsFullscreenExit onClick={fullScreenClickHandler} className={classes.fullScreenBtn} />
			) : (
				<BsArrowsFullscreen onClick={fullScreenClickHandler} className={classes.fullScreenBtn} />
			)}
		</div>
	);
}

GameOverlay.propTypes = {
	children: PropTypes.node.isRequired,
};

export default GameOverlay;
