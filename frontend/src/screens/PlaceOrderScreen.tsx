import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { Message, CheckoutSteps } from '../components';
import { createOrder } from '../actions';
import { AppDispatch } from '../store';
import { ReduxState } from '../types';

interface PlaceOrderScreenProps extends RouteComponentProps {}

const PlaceOrderScreen = ({ history }: PlaceOrderScreenProps) => {
	const dispatch = useDispatch<AppDispatch>();
	const { cartItems, paymentMethod, shippingAddress } = useSelector(
		(state: ReduxState) => state.cart
	);
	const { order, success, error } = useSelector(
		(state: ReduxState) => state.orderCreate
	);

	useEffect(() => {
		if (success && order) history.push(`/order/${order._id}`);
	}, [history, order, success]);

	if (!shippingAddress) {
		history.push('/shipping');
		return null;
	}
	if (!paymentMethod) {
		history.push('/payment');
		return null;
	}

	/**
	 * @description Calculate item ,shipping ,tax and total price
	 */
	const addDecimals = (num: number) => (Math.round(num * 100) / 100).toFixed(2);
	const itemsPrice = Number(
		addDecimals(cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))
	);
	const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 100);
	const taxPrice = addDecimals(0.15 * itemsPrice);
	const totalPrice = Number(
		Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)
	).toFixed(2);

	const placeOrderHandler = () => {
		dispatch(
			createOrder({
				orderItems: cartItems,
				shippingAddress,
				paymentMethod,
				itemsPrice,
				shippingPrice: parseFloat(shippingPrice),
				taxPrice: parseFloat(taxPrice),
				totalPrice: parseFloat(totalPrice)
			})
		);
	};

	return (
		<>
			<CheckoutSteps step1 step2 step3 step4 />
			<Row>
				<Col md={8}>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>Shipping</h2>
							<p>
								<strong>Address: </strong>
								{shippingAddress.address}, {shippingAddress.city} ,
								{shippingAddress.postalCode} ,{shippingAddress.country}
							</p>
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Payment Method</h2>
							<strong>Method: </strong>
							{paymentMethod}
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Order Items</h2>
							{cartItems.length === 0 ? (
								<Message>Your cart is empty</Message>
							) : (
								<ListGroup variant='flush'>
									{cartItems.map((item, index) => (
										<ListGroup.Item key={index}>
											<Row>
												<Col md={1}>
													<Image
														src={item.image}
														alt={item.name}
														fluid
														rounded
													/>
												</Col>
												<Col>
													<Link to={`/product/${item.product}`}>
														{item.name}
													</Link>
												</Col>
												<Col md={4}>
													{item.qty} x ${item.price} = ${item.qty * item.price}
												</Col>
											</Row>
										</ListGroup.Item>
									))}
								</ListGroup>
							)}
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={4}>
					<Card>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h2>Order Summary</h2>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Items</Col>
									<Col>${itemsPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Shipping</Col>
									<Col>${shippingPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Tax</Col>
									<Col>${taxPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Total</Col>
									<Col>${totalPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								{error && <Message variant='danger'>{error}</Message>}
							</ListGroup.Item>
							<ListGroup.Item>
								<Button
									type='button'
									className='btn-block'
									disabled={cartItems.length === 0}
									onClick={placeOrderHandler}>
									Place Order
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default PlaceOrderScreen;
