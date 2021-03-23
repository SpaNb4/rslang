import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Chapter from './Chapter/Chapter';

function Book() {
	return (
		<div>
			<Switch>
				<Route exact path="/book/:group" component={Chapter} />
			</Switch>
		</div>
	);
}

export default Book;
