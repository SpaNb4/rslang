import React from 'react';
import parse from 'html-react-parser';
import { FaVolumeUp } from 'react-icons/fa';
import { buildUrl, handleVolume } from '../../common/helpers';
import { ExternalUrls } from '../../common/constants';
import Button from '../Button/Button';
import classes from './ChapterItem.module.scss';
import { PropTypes } from 'prop-types';

function ChapterItem({ wordData, children, id, setIsCurrentlyPlaying, isPlayDisabled, color }) {
	return (
		<div className={classes.chapterItem} id={id} data-color={color}>
			<div className={classes.itemImage}>
				<img src={buildUrl(ExternalUrls.Root, wordData.image)} alt={wordData.word} />
			</div>
			<div className={classes.itemInfo}>
				<div className={classes.itemTitle}>
					<div>{wordData.word}</div>
					<div>{wordData.transcription}</div>
					<div>{wordData.wordTranslate}</div>
					<Button handler={() => handleVolume(wordData, setIsCurrentlyPlaying)} disabled={isPlayDisabled} color={color}>
						<FaVolumeUp />
					</Button>
				</div>
				<div className={classes.itemParagraph}>
					<div>
						<strong>Meaning:</strong>
					</div>
					<div>{parse(wordData.textMeaning)}</div>
				</div>
				<div className={classes.itemParagraph}>
					<div>{parse(wordData.textMeaningTranslate)}</div>
				</div>
				<div className={classes.itemParagraph}>
					<div>
						<strong>Example:</strong>
					</div>
					<div>{parse(wordData.textExample)}</div>
				</div>
				<div className={classes.itemParagraph}>
					<div>{parse(wordData.textExampleTranslate)}</div>
				</div>
			</div>
			<div className={classes.itemSettings}>{children}</div>
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
		word: PropTypes.string,
		image: PropTypes.string,
		audioExample: PropTypes.string,
		audioMeaning: PropTypes.string,
		audio: PropTypes.string,
		wordTranslate: PropTypes.string,
		transcription: PropTypes.string,
		textMeaning: PropTypes.string,
		textMeaningTranslate: PropTypes.string,
		textExample: PropTypes.string,
		textExampleTranslate: PropTypes.string,
	}).isRequired,
	children: PropTypes.node.isRequired,
	id: PropTypes.string,
	setIsCurrentlyPlaying: PropTypes.func.isRequired,
	isPlayDisabled: PropTypes.bool.isRequired,
	color: PropTypes.string.isRequired,
};

export default ChapterItem;
