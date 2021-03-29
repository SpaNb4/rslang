import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Chapter from './Chapter/Chapter';

export default function Vocabulary() {
	return (
		<div>
			<Switch>
				<Route exact path="/vocabulary/:group" component={Chapter} />
			</Switch>
		</div>
	);
}
