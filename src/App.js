import React from 'react';
// import Features from './components/Features/Features';
import Header from './components/Header/Header';
import Team from './components/Team/Team';

function App() {
	return (
		<>
			<Header />
			<main className="container">
				<Team />
			</main>
		</>
	);
}

export default App;
