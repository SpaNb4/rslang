import React from 'react';
import { PropTypes } from 'prop-types';
import parse from 'html-react-parser';
import classes from './ChapterItem.module.scss';

import { FaVolumeUp, FaThumbtack, FaRegTrashAlt } from 'react-icons/fa';

import { buildUrl } from '../../../../common/helpers';
import { ExternalUrls } from '../../../../common/constants';

function ChapterItem({ wordData }) {
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

	return (
		<div className={classes.chapterItem}>
			<div className={classes.itemImage}>
				<img src={buildUrl(ExternalUrls.Root, wordData.image)} alt={wordData.word} />
			</div>
			<div className={classes.itemInfo}>
				<div className={classes.itemTitle}>
					<div>{wordData.word}</div>
					<div>{wordData.transcription}</div>
					<div>{wordData.wordTranslate}</div>
					<button
						type="button"
						onClick={handleVolumeUp}
						data-audio={wordData.audio}
						data-meaning={wordData.audioMeaning}
						data-example={wordData.audioExample}
					>
						<FaVolumeUp />
					</button>
				</div>
				<div className={classes.itemParagraph}>
					<div>{parse(wordData.textMeaning)}</div>
				</div>
				<div className={classes.itemParagraph}>
					<div>{parse(wordData.textExample)}</div>
				</div>
			</div>
			<div className={classes.itemSettings}>
				<button className={classes.settingsButton} type="button">
					<FaThumbtack />
				</button>
				<button className={classes.settingsButton} type="button">
					<FaRegTrashAlt />
				</button>
			</div>
			<div className={classes.itemResults}>
				<div className={classes.resultItem}>
					<div>Игра 1</div>
					<div>Изучено</div>
				</div>
				<div className={classes.resultItem}>
					<div>Игра 2</div>
					<div>Изучено</div>
				</div>
				<div className={classes.resultItem}>
					<div>Игра 3</div>
					<div>Повторено</div>
				</div>
				<div className={classes.resultItem}>
					<div>Игра 4</div>
					<div>Повторено</div>
				</div>
			</div>
		</div>
	);
}

ChapterItem.propTypes = {
	wordData: PropTypes.shape({
		id: PropTypes.string,
		word: PropTypes.string,
		image: PropTypes.string,
		audioExample: PropTypes.string,
		audioMeaning: PropTypes.string,
		audio: PropTypes.string,
		wordTranslate: PropTypes.string,
		transcription: PropTypes.string,
		textMeaning: PropTypes.string,
		textExample: PropTypes.string,
		group: PropTypes.number,
		page: PropTypes.number,
	}).isRequired,
};

export default ChapterItem;
