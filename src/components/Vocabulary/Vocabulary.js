import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Chapter from './Chapter/Chapter';
import { globalClasses as c } from '../../common/constants';

export default function Vocabulary() {
	return (
		<main className={c.container}>
			<Switch>
				<Route exact path="/vocabulary/:group" component={Chapter} />
			</Switch>
		</main>
	);
}
