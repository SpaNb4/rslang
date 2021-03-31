import React from 'react';
import { Switch, Route } from 'react-router';
import Savanna from './Savanna/Savanna';
import AudioGame from './AudioGame/AudioGame';
import Kit from './Kit/Kit';

export default function GameRoutes() {
	return (
		<div>
			<Switch>
				<Route exact path="/game/savanna" component={Savanna} />
				<Route exact path="/game/sprint" component={Savanna} />
				<Route exact path="/game/audiogame" component={AudioGame} />
				<Route exact path="/game/kit" component={Kit} />
			</Switch>
		</div>
	);
}
