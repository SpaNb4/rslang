import React from 'react';
import { PropTypes } from 'prop-types';
import { menu } from '../../common/constants';
import classes from './ResultList.module.scss';

import ListItem from './ListItem/ListItem';

const ResultList = ({ wordData }) => {
	const items = menu.games.map(({ linkName, icon, color, linkId }, index) => {
		const trained = !!(wordData.userWord && wordData.userWord.optional[linkId]);
		return (
			<ListItem
				trained={trained}
				wordData={wordData}
				key={index}
				linkName={linkName}
				icon={icon}
				color={color}
				linkId={linkId}
			/>
		);
	});

	return <ul className={classes.gamesList}>{items}</ul>;
};

ResultList.propTypes = {
	wordData: PropTypes.shape({
		userWord: PropTypes.shape({
			optional: PropTypes.shape({
				word: PropTypes.string,
			}),
		}),
	}).isRequired,
};

export default ResultList;
