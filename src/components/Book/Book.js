import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { globalClasses as c } from '../../common/constants';

import Chapter from './Chapter/Chapter';

function Book() {
	return (
		<main className={c.container}>
			<Switch>
				<Route exact path="/book/:group" component={Chapter} />
			</Switch>
		</main>
	);
}

export default Book;
