import React, { useEffect } from 'react';
import { Carousel, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Loader, Message } from '.';
import { listTopProducts } from '../actions';
import { AppDispatch } from '../store';
import { ReduxState } from '../types';

const ProductCarousel = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { error, loading, products } = useSelector(
		(state: ReduxState) => state.productTopRated
	);
	useEffect(() => {
		if (products.length === 0) dispatch(listTopProducts());
	}, [dispatch, products]);

	const topProductsDisplay = () => {
		if (loading) return <Loader />;
		else if (error) return <Message variant='danger'>{error}</Message>;
		else
			return (
				<Carousel pause='hover' className='bg-dark'>
					{products.map((product) => (
						<Carousel.Item key={product._id}>
							<Link to={`/product/${product._id}`}>
								<Image src={product.image} alt={product.name} fluid />
								<Carousel.Caption className='carousel-caption'>
									<h2>
										{product.name} (${product.price})
									</h2>
								</Carousel.Caption>
							</Link>
						</Carousel.Item>
					))}
				</Carousel>
			);
	};

	return <>{topProductsDisplay()}</>;
};

export default ProductCarousel;
