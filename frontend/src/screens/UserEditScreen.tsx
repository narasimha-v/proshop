import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { Message, Loader, FormContainer } from '../components';
import { getUserDetails, updateUser } from '../actions';
import { AppDispatch } from '../store';
import { ReduxState, UserUpdateActionTypes } from '../types';

interface MatchParams {
	id: string;
}

interface UserEditScreenProps extends RouteComponentProps<MatchParams> {}

const UserEditScreen = ({
	match: {
		params: { id }
	},
	history
}: UserEditScreenProps) => {
	const userId = id;
	const [name, setName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [isAdmin, setIsAdmin] = useState<boolean>(false);

	const dispatch = useDispatch<AppDispatch>();
	const { user, loading, error } = useSelector(
		(state: ReduxState) => state.userDetails
	);
	const { loading: loadingUpdate, error: errorUpdate, success } = useSelector(
		(state: ReduxState) => state.userUpdate
	);

	useEffect(() => {
		if (success) {
			dispatch({ type: UserUpdateActionTypes.USER_UPDATE_RESET });
			history.push('/admin/userlist');
		} else {
			if (!user || user._id !== userId) dispatch(getUserDetails(userId));
			else {
				setName(user.name);
				setEmail(user.email);
				setIsAdmin(user.isAdmin);
			}
		}
	}, [dispatch, user, userId, success, history]);

	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(updateUser({ _id: userId, name, email, isAdmin }));
	};

	const UserDetailsDisplay = () => {
		if (loading || loadingUpdate) return <Loader />;
		else if (error) return <Message variant='danger'>{error}</Message>;
		else if (errorUpdate)
			return <Message variant='danger'>{errorUpdate}</Message>;
		else
			return (
				<FormContainer>
					<h1>Edit User</h1>
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
						<Form.Group controlId='isAdmin'>
							<Form.Check
								type='checkbox'
								label='Is Admin'
								checked={isAdmin}
								onChange={(e) =>
									setIsAdmin((e.target as HTMLInputElement).checked)
								}></Form.Check>
						</Form.Group>
						<Button type='submit' variant='primary'>
							Update
						</Button>
					</Form>
				</FormContainer>
			);
	};

	return (
		<>
			<Link to='/admin/userlist' className='btn btn-dark my-3'>
				Go Back
			</Link>
			<UserDetailsDisplay />
		</>
	);
};

export default UserEditScreen;
