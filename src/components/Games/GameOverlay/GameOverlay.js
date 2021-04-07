import React, { useState, useRef } from 'react';
import { PropTypes } from 'prop-types';
import { BsArrowsFullscreen, BsFullscreenExit } from 'react-icons/bs';
import screenfull from 'screenfull';
import classes from './GameOverlay.module.scss';
import { FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { changeVolume } from './../../../store/game/actions';
import { getVolume } from './../../../store/game/slices';

function GameOverlay({ children }) {
	const dispatch = useDispatch();
	const [isFullScreen, setIsFullScreen] = useState(false);
	const volume = useSelector(getVolume);
	const overlayRef = useRef(null);

	function fullScreenClickHandler() {
		screenfull.toggle(overlayRef.current);
		setIsFullScreen(!isFullScreen);
	}

	function soundClickHandler() {
		dispatch(changeVolume(!volume));
	}

	return (
		<div className={classes.fullScreenWrapper} ref={overlayRef}>
			{children}
			<div onClick={fullScreenClickHandler} className={classes.fullScreenBtn}>
				{isFullScreen ? <BsFullscreenExit /> : <BsArrowsFullscreen />}
			</div>
			<div onClick={soundClickHandler} className={classes.soundBtn}>
				{volume ? <FaVolumeUp /> : <FaVolumeMute />}
			</div>
		</div>
	);
}

GameOverlay.propTypes = {
	children: PropTypes.node.isRequired,
};

export default GameOverlay;
