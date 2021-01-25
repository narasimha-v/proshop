import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import 'colorts/lib/string';

import { connectDB } from './config';
import { productRoutes, userRoutes, orderRoutes, uploadRoutes } from './routes';
import { notFound, errorHandler } from './middleware';

dotenv.config();
if (process.env.NODE_ENV === 'development') {
	morgan('dev');
}

connectDB();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);
app.get('/api/config/paypal', (req, res) =>
	res.send(process.env.PAYPAL_CLIENT_ID!)
);
const dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(dirname, '/frontend/build')));
	app.get('*', (req, res) =>
		res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
	);
} else {
	app.get('/', (req, res) => res.json({ message: 'api is responding' }));
}
app.use('/uploads', express.static(path.join(dirname, '/uploads')));
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(
		`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.green
			.bold
	);
});
