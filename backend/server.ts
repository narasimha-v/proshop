import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';

import products from './data/products';

dotenv.config();
if (process.env.NODE_ENV === 'development') {
	morgan('dev');
}

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
	res.send(`Hit Home Route`);
});

app.get('/api/products', (req, res) => {
	res.json(products);
});

app.get('/api/products/:id', (req, res) => {
	const { id } = req.params as { id: string };
	const product = products.find((p) => p._id === id);
	res.json(product);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(
		`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
	);
});
