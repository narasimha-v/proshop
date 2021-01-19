import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';

import { Message, Loader } from '../components';
import { getUserDetails, updateUserProfile, listMyOrders } from '../actions';
import { AppDispatch } from '../store';
import { ReduxState, UserUpdateProfileActionTypes } from '../types';

interface ProfileScreenProps extends RouteComponentProps {}

const ProfileScreen = ({ history }: ProfileScreenProps) => {
	const [name, setName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [confirmPassword, setConfirmPassword] = useState<string>('');
	const [message, setMessage] = useState<string>();
	const [updateMessage, setUpdateMessage] = useState<boolean>(false);

	const dispatch = useDispatch<AppDispatch>();
	const { user, loading, error } = useSelector(
		(state: ReduxState) => state.userDetails
	);
	const { userInfo } = useSelector((state: ReduxState) => state.userLogin);
	const { success } = useSelector(
		(state: ReduxState) => state.userUpdateProfile
	);
	const { orders, loading: loadingOrders, error: errorOrders } = useSelector(
		(state: ReduxState) => state.orderListMy
	);

	useEffect(() => {
		if (!userInfo) history.push('/login');
		else {
			if (!user || success) {
				dispatch(getUserDetails('profile'));
				dispatch(listMyOrders());
				dispatch({
					type: UserUpdateProfileActionTypes.USER_UPDATE_PROFILE_RESET
				});
				setUpdateMessage(true);
			} else if (success) {
			} else {
				setName(user.name);
				setEmail(user.email);
			}
		}
	}, [history, userInfo, dispatch, user, success, error]);

	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (password !== confirmPassword) setMessage('Password do not match');
		else {
			if (!user) return;
			dispatch(
				updateUserProfile({
					_id: user._id,
					name,
					email,
					isAdmin: user.isAdmin,
					password
				})
			);
		}
	};

	return (
		<Row>
			<Col md={3}>
				<h2>User Profile</h2>
				{error && <Message variant='danger'>{error}</Message>}
				{message && <Message variant='danger'>{message}</Message>}
				{updateMessage && !loading && (
					<Message variant='success'>Profile Updated</Message>
				)}
				{loading && <Loader />}
				<Form onSubmit={submitHandler}>
					<Form.Group controlId='name'>
						<Form.Label>Name</Form.Label>
						<Form.Control
							type='text'
							placeholder='Name'
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</Form.Group>
					<Form.Group controlId='email'>
						<Form.Label>Email Address</Form.Label>
						<Form.Control
							type='email'
							placeholder='Email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</Form.Group>
					<Form.Group controlId='password'>
						<Form.Label>Password</Form.Label>
						<Form.Control
							type='password'
							placeholder='Password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</Form.Group>
					<Form.Group controlId='ConfirmPassword'>
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control
							type='password'
							placeholder='Confirm Password'
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</Form.Group>
					<Button type='submit' variant='primary'>
						Update
					</Button>
				</Form>
			</Col>
			<Col md={9}>
				<h2>My Orders</h2>
				{loadingOrders ? (
					<Loader />
				) : errorOrders ? (
					<Message variant='danger'>{errorOrders}</Message>
				) : (
					<Table striped bordered hover responsive className='table-sm'>
						<thead>
							<tr>
								<th>ID</th>
								<th>DATE</th>
								<th>TOTAL</th>
								<th>PAID</th>
								<th>DELIVERED</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{orders.map((order) => (
								<tr key={order._id}>
									<td>{order._id}</td>
									<td>{order.createdAt.substring(0, 10)}</td>
									<td>{order.totalPrice}</td>
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
											<Button className='btn-sm' variant='light'>
												Details
											</Button>
										</LinkContainer>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				)}
			</Col>
		</Row>
	);
};

export default ProfileScreen;
