import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import parse from 'html-react-parser';
import classes from './ChapterItem.module.scss';

import { FaVolumeUp, FaRegTrashAlt } from 'react-icons/fa';

import { buildUrl, handleVolumeUp } from '../../../../common/helpers';
import { ExternalUrls } from '../../../../common/constants';
import { getUserId, getToken } from '../../../../store/app/slices';
import { deleteUserWord } from './../../../../store/dictionary/actions';

function ChapterItem({ wordData }) {
	const dispatch = useDispatch();
	const userId = useSelector(getUserId);
	const token = useSelector(getToken);

	function restoreWordToBook() {
		dispatch(deleteUserWord(userId, token, wordData));
	}

	return (
		<div className={classes.chapterItem}>
			<div className={classes.itemImage}>
				<img src={buildUrl(ExternalUrls.Root, wordData.optional.image)} alt={wordData.optional.word} />
			</div>
			<div className={classes.itemInfo}>
				<div className={classes.itemTitle}>
					<div>{wordData.optional.word}</div>
					<div>{wordData.optional.transcription}</div>
					<div>{wordData.optional.wordTranslate}</div>
					<button
						type="button"
						onClick={handleVolumeUp}
						data-audio={wordData.optional.audio}
						data-meaning={wordData.optional.audioMeaning}
						data-example={wordData.optional.audioExample}
					>
						<FaVolumeUp />
					</button>
				</div>
				<div className={classes.itemParagraph}>
					<div>{parse(wordData.optional.textMeaning)}</div>
				</div>
				<div className={classes.itemParagraph}>
					<div>{parse(wordData.optional.textExample)}</div>
				</div>
			</div>
			<div className={classes.itemSettings}>
				<button className={classes.settingsButton} onClick={restoreWordToBook} type="button">
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
		difficulty: PropTypes.string,
		optional: PropTypes.shape({
			word: PropTypes.string,
			image: PropTypes.string,
			audioExample: PropTypes.string,
			audioMeaning: PropTypes.string,
			audio: PropTypes.string,
			wordTranslate: PropTypes.string,
			transcription: PropTypes.string,
			textMeaning: PropTypes.string,
			textExample: PropTypes.string,
		}),
		wordId: PropTypes.string,
	}).isRequired,
};

export default ChapterItem;
