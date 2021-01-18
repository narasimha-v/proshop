import dotenv from 'dotenv';
import 'colorts/lib/string';

import { users, products } from './data';
import { User, Order, Product } from './models';
import { connectDB } from './config';
import { UserDocument, Review } from './types';

dotenv.config();
connectDB();

const importData = async () => {
	try {
		await Order.deleteMany();
		await Product.deleteMany();
		await User.deleteMany();

		const createdUsers = await User.insertMany(users);
		const adminUser: UserDocument = createdUsers[0]._id;
		const sampleProducts = products.map((p) => {
			let reviews: Review[] = [];
			return { ...p, user: adminUser.id, reviews };
		});
		await Product.insertMany(sampleProducts);
		console.log(`Data Imported`.green.inverse);
		process.exit();
	} catch (error) {
		console.error(`${error}`.red.inverse);
		process.exit(1);
	}
};

const destroyData = async () => {
	try {
		await Order.deleteMany();
		await Product.deleteMany();
		await User.deleteMany();

		console.log(`Data Destroyed`.red.inverse);
		process.exit();
	} catch (error) {
		console.error(`${error}`.red.inverse);
		process.exit(1);
	}
};

if (process.argv[2] === '-d') destroyData();
else importData();
