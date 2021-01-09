import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { Loader, Product, Message } from '../components';
import { AppDispatch } from '../store';
import { listProducts } from '../actions';
import { ReduxState } from '../types';

const HomeScreen = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { products, loading, error } = useSelector(
		(state: ReduxState) => state.productList
	);

	useEffect(() => {
		dispatch(listProducts());
	}, [dispatch]);

	const displayProducts = () => {
		if (loading) return <Loader />;
		else if (error) return <Message variant='danger'>{error}</Message>;
		else
			return (
				<Row>
					{products.map((product) => (
						<Col sm={12} md={6} lg={4} xl={3} key={product._id}>
							<Product product={product} />
						</Col>
					))}
				</Row>
			);
	};

	return (
		<>
			<h1>Latest Products</h1>
			{displayProducts()}
		</>
	);
};

export default HomeScreen;
