import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import 'colorts/lib/string';

import { connectDB } from './config';
import { productRoutes } from './routes';

dotenv.config();
if (process.env.NODE_ENV === 'development') {
	morgan('dev');
}

connectDB();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
	res.send(`Hit Home Route`);
});

app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(
		`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.green
			.bold
	);
});
