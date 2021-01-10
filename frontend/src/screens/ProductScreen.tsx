import React, { FunctionComponent, useEffect, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import {
	Row,
	Col,
	Image,
	ListGroup,
	Card,
	Button,
	Form
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { Loader, Message, Rating } from '../components';
import { ReduxState } from '../types';
import { AppDispatch } from '../store';
import { listProductDetails } from '../actions';

interface MatchParams {
	id: string;
}

interface ProductScreenProps extends RouteComponentProps<MatchParams> {}

const ProductScreen: FunctionComponent<ProductScreenProps> = ({
	match: {
		params: { id }
	},
	history
}: ProductScreenProps) => {
	const [qty, setQty] = useState(1);
	const dispatch = useDispatch<AppDispatch>();
	const { product, loading, error } = useSelector(
		(state: ReduxState) => state.productDetails
	);

	useEffect(() => {
		dispatch(listProductDetails(id));
	}, [id, dispatch]);

	const addToCartHandler = () => {
		history.push(`/cart/${id}?qty=${qty}`);
	};

	const ProductDetailDisplay = () => {
		if (loading) return <Loader />;
		else if (error) return <Message variant='danger'>{error}</Message>;
		else if (!product)
			return <Message variant='danger'>Product Not Found</Message>;
		else
			return (
				<>
					<Link to='/' className='btn btn-dark my-3'>
						Go Back
					</Link>
					<Row>
						<Col md={6}>
							<Image src={product.image} alt={product.name} fluid />
						</Col>
						<Col md={3}>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<h3>{product.name}</h3>
								</ListGroup.Item>
								<ListGroup.Item>
									<Rating
										value={product.rating}
										text={`${product.numReviews} reviews`}
									/>
								</ListGroup.Item>
								<ListGroup.Item>Price: ${product.price}</ListGroup.Item>
								<ListGroup.Item>
									Description: {product.description}
								</ListGroup.Item>
							</ListGroup>
						</Col>
						<Col md={3}>
							<Card>
								<ListGroup variant='flush'>
									<ListGroup.Item>
										<Row>
											<Col>Price:</Col>
											<Col>
												<strong>${product.price}</strong>
											</Col>
										</Row>
									</ListGroup.Item>
									<ListGroup.Item>
										<Row>
											<Col>Status:</Col>
											<Col>
												{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
											</Col>
										</Row>
									</ListGroup.Item>
									{product.countInStock > 0 && (
										<ListGroup.Item>
											<Row>
												<Col>Qty</Col>
												<Col>
													<Form.Control
														as='select'
														value={qty}
														onChange={(e) => setQty(Number(e.target.value))}>
														{[...Array(product.countInStock).keys()].map(
															(x) => (
																<option key={x + 1} value={x + 1}>
																	{x + 1}
																</option>
															)
														)}
													</Form.Control>
												</Col>
											</Row>
										</ListGroup.Item>
									)}
									<ListGroup.Item>
										<Button
											onClick={addToCartHandler}
											disabled={product.countInStock <= 0}
											className='btn btn-block'
											type='button'>
											Add To Cart
										</Button>
									</ListGroup.Item>
								</ListGroup>
							</Card>
						</Col>
					</Row>
				</>
			);
	};

	return <ProductDetailDisplay />;
};

export default ProductScreen;
