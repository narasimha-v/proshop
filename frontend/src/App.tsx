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
	PlaceOrderScreen,
	OrderScreen,
	UserListScreen,
	UserEditScreen,
	ProductListScreen,
	ProductEditScreen,
	orderListScreen
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
					<Route path='/admin/userlist' component={UserListScreen} />
					<Route
						exact
						path='/admin/productlist'
						component={ProductListScreen}
					/>
					<Route
						path='/admin/productlist/:pageNumber'
						component={ProductListScreen}
					/>
					<Route path='/admin/orderlist' component={orderListScreen} />
					<Route path='/admin/user/:id/edit' component={UserEditScreen} />
					<Route path='/admin/product/:id/edit' component={ProductEditScreen} />
					<Route path='/shipping' component={ShippingScreen} />
					<Route path='/payment' component={PaymentScreen} />
					<Route path='/placeorder' component={PlaceOrderScreen} />
					<Route path='/order/:id' component={OrderScreen} />
					<Route path='/product/:id' component={ProductScreen} />
					<Route path='/cart/:id?' component={CartScreen} />
					<Route exact path='/search/:keyword' component={HomeScreen} />
					<Route exact path='/page/:pageNumber' component={HomeScreen} />
					<Route
						exact
						path='/search/:keyword/page/:pageNumber'
						component={HomeScreen}
					/>
					<Route exact path='/' component={HomeScreen} />
				</Container>
			</main>
			<Footer />
		</Router>
	);
};

export default App;
