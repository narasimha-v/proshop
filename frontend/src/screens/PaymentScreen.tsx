import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { FormContainer, CheckoutSteps } from '../components';
import { savePaymentMethod } from '../actions';
import { AppDispatch } from '../store';
import { ReduxState } from '../types';

interface PaymentScreenProps extends RouteComponentProps {}

const PaymentScreen = ({ history }: PaymentScreenProps) => {
	const dispatch = useDispatch<AppDispatch>();
	const { shippingAddress } = useSelector((state: ReduxState) => state.cart);
	const [paymentMethod, setPaymentMethod] = useState<string>('PayPal');

	if (!shippingAddress) {
		history.push('/shipping');
		return null;
	}

	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		history.push('/placeorder');
	};

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 step3 />
			<h1>Payment Method</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group controlId='address'>
					<Form.Label as='legend'>Select Method</Form.Label>
					<Col>
						<Form.Check
							type='radio'
							label='PayPal or Credit Card'
							id='PayPal'
							name='PaymentMethod'
							value='PayPal'
							checked
							onChange={(e) =>
								setPaymentMethod((e.target as HTMLInputElement).value)
							}
						/>
					</Col>
				</Form.Group>
				<Button type='submit' variant='primary'>
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
};

export default PaymentScreen;
