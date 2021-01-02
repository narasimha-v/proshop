import React from 'react';
import { Header, Footer } from './components';
import { Container } from 'react-bootstrap';

const App = () => {
	return (
		<>
			<Header />
			<main className='py-3'>
				<Container>
					<h1>Welcome to pro shop</h1>
				</Container>
			</main>
			<Footer />
		</>
	);
};

export default App;
