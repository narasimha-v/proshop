import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { FormContainer, CheckoutSteps } from '../components';
import { saveShippingAddress } from '../actions';
import { AppDispatch } from '../store';
import { ReduxState } from '../types';

interface ShippingScreenProps extends RouteComponentProps {}

const ShippingScreen = ({ history }: ShippingScreenProps) => {
	const dispatch = useDispatch<AppDispatch>();
	const { shippingAddress } = useSelector((state: ReduxState) => state.cart);

	const [address, setAddress] = useState<string>(
		shippingAddress ? shippingAddress.address : ''
	);
	const [city, setCity] = useState<string>(
		shippingAddress ? shippingAddress.city : ''
	);
	const [postalCode, setPostalCode] = useState<string>(
		shippingAddress ? shippingAddress.postalCode : ''
	);
	const [country, setCountry] = useState<string>(
		shippingAddress ? shippingAddress.country : ''
	);
	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(saveShippingAddress({ address, city, country, postalCode }));
		history.push('/payment');
	};

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 />
			<h1>Shipping</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group controlId='address'>
					<Form.Label>Address</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter Address'
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						required
					/>
				</Form.Group>
				<Form.Group controlId='city'>
					<Form.Label>City</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter City'
						value={city}
						onChange={(e) => setCity(e.target.value)}
						required
					/>
				</Form.Group>
				<Form.Group controlId='postalCode'>
					<Form.Label>Postal Code</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter Postal Code'
						value={postalCode}
						onChange={(e) => setPostalCode(e.target.value)}
						required
					/>
				</Form.Group>
				<Form.Group controlId='Country'>
					<Form.Label>Country</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter Country'
						value={country}
						onChange={(e) => setCountry(e.target.value)}
						required
					/>
				</Form.Group>
				<Button type='submit' variant='primary'>
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
};

export default ShippingScreen;
