import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Header, Footer } from './components';
import { Container } from 'react-bootstrap';
import { HomeScreen, ProductScreen } from './screens';

const App = () => {
	return (
		<Router>
			<Header />
			<main className='py-3'>
				<Container>
					<Route exact path='/' component={HomeScreen} />
					<Route path='/product/:id' component={ProductScreen} />
				</Container>
			</main>
			<Footer />
		</Router>
	);
};

export default App;
