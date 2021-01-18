import React, { useEffect, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { PayPalButton } from '@repeatgg/react-paypal-button-v2';
import axios from 'axios';

import { Message, Loader } from '../components';
import { getOrderDetails, payOrder } from '../actions';
import { AppDispatch } from '../store';
import { ReduxState, OrderPayActionTypes } from '../types';

interface MatchParams {
	id: string;
}

interface OrderScreenProps extends RouteComponentProps<MatchParams> {}

const OrderScreen = ({
	match: {
		params: { id }
	}
}: OrderScreenProps) => {
	const orderId = id;
	const [sdkReady, setSdkReady] = useState<boolean>(false);
	const dispatch = useDispatch<AppDispatch>();
	const { order, loading, error } = useSelector(
		(state: ReduxState) => state.orderDetails
	);
	const { loading: loadingPay, success: successPay } = useSelector(
		(state: ReduxState) => state.orderPay
	);

	useEffect(() => {
		const addPayPalScript = async () => {
			const { data: clientId } = await axios.get('/api/config/paypal');
			const script = document.createElement('script');
			script.type = 'text/javascript';
			script.async = true;
			script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
			script.onload = () => setSdkReady(true);
			document.body.appendChild(script);
		};

		if (successPay || !order || order._id !== orderId) {
			dispatch({ type: OrderPayActionTypes.ORDER_PAY_RESET });
			dispatch(getOrderDetails(orderId));
		} else if (!order.isPaid) {
			// @ts-ignore
			if (!window.paypal) addPayPalScript();
			else setSdkReady(true);
		}
	}, [dispatch, order, orderId, successPay]);

	const successPaymentHandler = (paymentResult: any) => {
		console.log(paymentResult);
		dispatch(payOrder(orderId, paymentResult));
	};

	const addDecimals = (num: number) => (Math.round(num * 100) / 100).toFixed(2);

	const DisplayOrderDetails = () => {
		if (loading) return <Loader />;
		else if (error || !order)
			return <Message variant='danger'>{error}</Message>;
		else
			return (
				<Row>
					<Col md={8}>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h2>Shipping</h2>
								<p>
									<strong>Name: </strong> {order.user.name}
								</p>
								<p>
									<strong>Email: </strong>{' '}
									<a href={`mailto:${order.user.email}`}>{order.user.email}</a>
								</p>
								<p>
									<strong>Address: </strong>
									{order.shippingAddress.address}, {order.shippingAddress.city}{' '}
									,{order.shippingAddress.postalCode} ,
									{order.shippingAddress.country}
								</p>
								{order.isDelivered ? (
									<Message variant='success'>
										Delivered on {order.deliveredAt}
									</Message>
								) : (
									<Message variant='danger'>Not Delivered</Message>
								)}
							</ListGroup.Item>
							<ListGroup.Item>
								<h2>Payment Method</h2>
								<p>
									<strong>Method: </strong>
									{order.paymentMethod}
								</p>
								{order.isPaid ? (
									<Message variant='success'>Paid on {order.paidAt}</Message>
								) : (
									<Message variant='danger'>Not Paid</Message>
								)}
							</ListGroup.Item>
							<ListGroup.Item>
								<h2>Order Items</h2>
								{order.orderItems.length === 0 ? (
									<Message>Your cart is empty</Message>
								) : (
									<ListGroup variant='flush'>
										{order.orderItems.map((item, index) => (
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
														{item.qty} x ${item.price} = $
														{item.qty * item.price}
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
										<Col>${addDecimals(order.itemsPrice)}</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Shipping</Col>
										<Col>${addDecimals(order.shippingPrice)}</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Tax</Col>
										<Col>${addDecimals(order.taxPrice)}</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Total</Col>
										<Col>${addDecimals(order.totalPrice)}</Col>
									</Row>
								</ListGroup.Item>
								{!order.isPaid && (
									<ListGroup.Item>
										{loadingPay || !sdkReady ? (
											<Loader />
										) : (
											<PayPalButton
												amount={order.totalPrice}
												// shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
												onSuccess={successPaymentHandler}
											/>
										)}
									</ListGroup.Item>
								)}
							</ListGroup>
						</Card>
					</Col>
				</Row>
			);
	};

	return <DisplayOrderDetails />;
};

export default OrderScreen;
