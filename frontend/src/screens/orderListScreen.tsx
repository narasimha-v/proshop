import React, { useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { RouteComponentProps } from 'react-router-dom';

import { Message, Loader } from '../components';
import { listOrders } from '../actions';
import { AppDispatch } from '../store';
import { ReduxState } from '../types';

interface OrderListScreenProps extends RouteComponentProps {}

const OrderListScreen = ({ history }: OrderListScreenProps) => {
	const dispatch = useDispatch<AppDispatch>();
	const { loading, orders, error } = useSelector(
		(state: ReduxState) => state.orderList
	);
	const { userInfo } = useSelector((state: ReduxState) => state.userLogin);

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) dispatch(listOrders());
		else history.push('/login');
	}, [dispatch, history, userInfo]);

	const orderListDisplay = () => {
		if (loading) return <Loader />;
		else if (error) return <Message variant='danger'>{error}</Message>;
		else
			return (
				<Table striped bordered hover responsive className='table-sm'>
					<thead>
						<tr>
							<th>ID</th>
							<th>USER</th>
							<th>DATE</th>
							<th>PRICE</th>
							<th>PAID</th>
							<th>DELIVERED</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{orders.map((order) => (
							<tr key={order._id}>
								<td>{order._id}</td>
								<td>{order.user && order.user.name}</td>
								<td>{order.createdAt.substring(0, 10)}</td>
								<td>${order.totalPrice}</td>
								<td>
									{order.isPaid ? (
										order.paidAt?.substring(0, 10)
									) : (
										<i className='fas fa-times' style={{ color: 'red' }}></i>
									)}
								</td>
								<td>
									{order.isDelivered ? (
										order.deliveredAt?.substring(0, 10)
									) : (
										<i className='fas fa-times' style={{ color: 'red' }}></i>
									)}
								</td>
								<td>
									<LinkContainer to={`/order/${order._id}`}>
										<Button variant='light' className='btn-sm'>
											Details
										</Button>
									</LinkContainer>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			);
	};

	return (
		<>
			<h1>Orders</h1>
			{orderListDisplay()}
		</>
	);
};

export default OrderListScreen;
