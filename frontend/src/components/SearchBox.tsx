import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const SearchBox = () => {
	const [keyword, setKeyword] = useState<string>('');
	const { push } = useHistory();
	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (keyword.trim()) push(`/search/${keyword}`);
		else push('/');
	};

	return (
		<Form onSubmit={submitHandler} inline>
			<Form.Control
				type='text'
				name='search'
				onChange={(e) => setKeyword(e.target.value)}
				value={keyword}
				placeholder='Search Products...'
				className='mr-sm-2 ml-sm-5'
			/>
			<Button type='Submit' variant='outline-success' className='p-2'>
				Search
			</Button>
		</Form>
	);
};

export default SearchBox;
