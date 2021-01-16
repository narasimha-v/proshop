import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import { Header, Footer } from './components';
import {
	HomeScreen,
	ProductScreen,
	CartScreen,
	LoginScreen,
	RegisterScreen,
	ProfileScreen,
	ShippingScreen,
	PaymentScreen,
	PlaceOrderScreen
} from './screens';

const App = () => {
	return (
		<Router>
			<Header />
			<main className='py-3'>
				<Container>
					<Route path='/login' component={LoginScreen} />
					<Route path='/register' component={RegisterScreen} />
					<Route path='/profile' component={ProfileScreen} />
					<Route path='/shipping' component={ShippingScreen} />
					<Route path='/payment' component={PaymentScreen} />
					<Route path='/placeorder' component={PlaceOrderScreen} />
					<Route path='/product/:id' component={ProductScreen} />
					<Route path='/cart/:id?' component={CartScreen} />
					<Route exact path='/' component={HomeScreen} />
				</Container>
			</main>
			<Footer />
		</Router>
	);
};

export default App;
