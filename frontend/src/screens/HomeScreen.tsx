import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';

import {
	Loader,
	Product,
	Message,
	Paginate,
	ProductCarousel,
	Meta
} from '../components';
import { AppDispatch } from '../store';
import { listProducts } from '../actions';
import { ReduxState } from '../types';

interface MatchParams {
	keyword: string;
	pageNumber: string;
}
interface HomeScreenProps extends RouteComponentProps<MatchParams> {}

const HomeScreen = ({
	match: {
		params: { keyword, pageNumber: pgNumber }
	}
}: HomeScreenProps) => {
	const pageNumber = pgNumber || '1';
	const dispatch = useDispatch<AppDispatch>();
	const { products, loading, error, page, pages } = useSelector(
		(state: ReduxState) => state.productList
	);

	useEffect(() => {
		dispatch(listProducts(keyword, pageNumber));
	}, [dispatch, keyword, pageNumber]);

	const displayProducts = () => {
		if (loading) return <Loader />;
		else if (error) return <Message variant='danger'>{error}</Message>;
		else
			return (
				<>
					{!keyword ? (
						<ProductCarousel />
					) : (
						<Link to='/' className='btn btn-dark'>
							Go Back
						</Link>
					)}
					<Row>
						{products.map((product) => (
							<Col sm={12} md={6} lg={4} xl={3} key={product._id}>
								<Product product={product} />
							</Col>
						))}
					</Row>
					{pages && page && (
						<Paginate
							page={page}
							pages={pages}
							keyword={keyword ? keyword : ''}
						/>
					)}
				</>
			);
	};

	return (
		<>
			<Meta title='Welcome To ProShop' />
			<h1>Latest Products</h1>
			{displayProducts()}
		</>
	);
};

export default HomeScreen;
