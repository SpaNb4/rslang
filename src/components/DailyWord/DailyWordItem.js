import React from 'react';
import { PropTypes } from 'prop-types';
import { FaVolumeUp } from 'react-icons/fa';
import parse from 'html-react-parser';
import { buildUrl } from '../../common/helpers';
import { ExternalUrls, globalClasses as c } from '../../common/constants';
import classes from './DailyWord.module.scss';

// temp
function handleVolumeUp(e) {
	const { audio, meaning, example } = e.currentTarget.dataset;
	const urlsList = [audio, meaning, example];
	const audioList = urlsList.map((url) => new Audio(buildUrl(ExternalUrls.Root, url)));

	audioList[0].play();
	audioList[0].onended = () => {
		audioList[1].play();
		audioList[1].onended = () => {
			audioList[2].play();
		};
	};
}

const DailyWordItem = ({
	word,
	audio,
	audioMeaning,
	audioExample,
	transcription,
	wordTranslate,
	textMeaning,
	textMeaningTranslate,
	textExample,
	textExampleTranslate,
}) => {
	return (
		<div className={classes.wrapper}>
			<div className={classes.wordWrapper}>
				<span className={classes.word}>{word}</span>
				<button
					className={c.audioButton}
					type="button"
					onClick={handleVolumeUp}
					data-audio={audio}
					data-meaning={audioMeaning}
					data-example={audioExample}
				>
					<FaVolumeUp />
				</button>
			</div>
			<div className={classes.info}>
				<span>{transcription}</span>
				<span className={classes.separator}></span>
				<span>{wordTranslate}</span>
			</div>
			<div className={classes.meaning}>
				<h5 className={classes.title}>Значение</h5>
				<span>
					<strong>En:</strong> {parse(textMeaning)}
				</span>
				<br />
				<span>
					<strong>Ру:</strong> {parse(textMeaningTranslate)}
				</span>
			</div>
			<div className={classes.meaning}>
				<h5 className={classes.title}>Примеры</h5>
				<span>
					<strong>En:</strong> {parse(textExample)}
				</span>
				<br />
				<span>
					<strong>Ру:</strong> {parse(textExampleTranslate)}
				</span>
			</div>
		</div>
	);
};

DailyWordItem.propTypes = {
	word: PropTypes.string,
	// image: PropTypes.string,
	audioExample: PropTypes.string,
	audioMeaning: PropTypes.string,
	audio: PropTypes.string,
	wordTranslate: PropTypes.string,
	transcription: PropTypes.string,
	textMeaning: PropTypes.string,
	textMeaningTranslate: PropTypes.string,
	textExample: PropTypes.string,
	textExampleTranslate: PropTypes.string,
};

export default DailyWordItem;
