import React, { useEffect } from 'react';
import { Button, Table, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { RouteComponentProps } from 'react-router-dom';

import { Message, Loader } from '../components';
import { listProducts, deleteProduct } from '../actions';
import { AppDispatch } from '../store';
import { ReduxState } from '../types';

interface MatchParams {
	id: string;
}

interface ProductListProps extends RouteComponentProps<MatchParams> {}

const ProductList = ({
	history,
	match: {
		params: { id }
	}
}: ProductListProps) => {
	const dispatch = useDispatch<AppDispatch>();
	const { loading, products, error } = useSelector(
		(state: ReduxState) => state.productList
	);
	const { success, loading: loadingDelete, error: errorDelete } = useSelector(
		(state: ReduxState) => state.productDelete
	);
	const { userInfo } = useSelector((state: ReduxState) => state.userLogin);

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) dispatch(listProducts());
		else history.push('/login');
	}, [dispatch, history, userInfo, success]);

	const deleteHandler = (userId: string) => {
		if (window.confirm('Are you sure')) {
			dispatch(deleteProduct(userId));
		}
	};

	const createProductHandler = () => {
		/**
		 * Create Product
		 */
	};

	const ProductsListDisplay = () => {
		if (loading || loadingDelete) return <Loader />;
		else if (error) return <Message variant='danger'>{error}</Message>;
		else if (errorDelete)
			return <Message variant='danger'>{errorDelete}</Message>;
		else
			return (
				<Table striped bordered hover responsive className='table-sm'>
					<thead>
						<tr>
							<th>ID</th>
							<th>NAME</th>
							<th>PRICE</th>
							<th>CATEGORY</th>
							<th>BRAND</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{products.map((product) => (
							<tr key={product._id}>
								<td>{product._id}</td>
								<td>{product.name}</td>
								<td>${product.price}</td>
								<td>{product.category}</td>
								<td>{product.brand}</td>
								<td>
									<LinkContainer to={`/admin/product/${product._id}/edit`}>
										<Button variant='light' className='btn-sm'>
											<i className='fas fa-edit'></i>
										</Button>
									</LinkContainer>
									<Button
										variant='danger'
										className='btn-sm'
										onClick={() => deleteHandler(product._id)}>
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
			<Row className='align-items-center'>
				<Col>
					<h1>Products</h1>
				</Col>
				<Col className='text-right'>
					<Button className='my-3' onClick={createProductHandler}>
						<i className='fas fa-plus'></i> Create Product
					</Button>
				</Col>
			</Row>
			<ProductsListDisplay />
		</>
	);
};

export default ProductList;
