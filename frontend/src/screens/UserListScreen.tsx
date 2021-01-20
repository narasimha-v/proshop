import React, { useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { RouteComponentProps } from 'react-router-dom';

import { Message, Loader } from '../components';
import { listUsers } from '../actions';
import { AppDispatch } from '../store';
import { ReduxState } from '../types';

interface UserListScreenProps extends RouteComponentProps {}

const UserListScreen = ({ history }: UserListScreenProps) => {
	const dispatch = useDispatch<AppDispatch>();
	const { loading, users, error } = useSelector(
		(state: ReduxState) => state.userList
	);
	const { userInfo } = useSelector((state: ReduxState) => state.userLogin);

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) dispatch(listUsers());
		else history.push('/login');
	}, [dispatch, history, userInfo]);

	const deleteHandler = (userId: string) => {};

	const UsersListDisplay = () => {
		if (loading) return <Loader />;
		else if (error) return <Message variant='danger'>{error}</Message>;
		else
			return (
				<Table striped bordered hover responsive className='table-sm'>
					<thead>
						<tr>
							<th>ID</th>
							<th>NAME</th>
							<th>EMAIL</th>
							<th>ADMIN</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<tr key={user._id}>
								<td>{user._id}</td>
								<td>{user.name}</td>
								<td>
									<a href={`mailto:${user.email}`}>{user.email}</a>
								</td>
								<td>
									{user.isAdmin ? (
										<i className='fas fa-check' style={{ color: 'green' }} />
									) : (
										<i className='fas fa-times' style={{ color: 'red' }} />
									)}
								</td>
								<td>
									<LinkContainer to={`/user/${user._id}/edit`}>
										<Button variant='light' className='btn-sm'>
											<i className='fas fa-edit'></i>
										</Button>
									</LinkContainer>
									<Button
										variant='danger'
										className='btn-sm'
										onClick={() => deleteHandler(user._id)}>
										<i className='fas fa-trash'></i>
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			);
	};

	return (
		<>
			<h1>Users</h1>
			<UsersListDisplay />
		</>
	);
};

export default UserListScreen;
