import React from 'react';
import { Switch, Route } from 'react-router-dom';
import classes from './Book.module.scss';

import Chapter from './Chapter/Chapter';

function Book() {
	return (
		<div className={classes.Book}>
			<Switch>
				<Route exact path="/book/:group" component={Chapter} />
			</Switch>
		</div>
	);
}

export default Book;
