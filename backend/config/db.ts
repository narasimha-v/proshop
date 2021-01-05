import mongoose from 'mongoose';

const connectDB = async () => {
	try {
		const MONGO_URI = process.env.MONGO_URI;
		if (!MONGO_URI) throw new Error('MONGO_URI not found.');
		const conn = await mongoose.connect(MONGO_URI, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useCreateIndex: true
		});
		console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);
	} catch (error) {
		console.error(`Error:${error.message}`.red.underline.bold);
		process.exit(1);
	}
};

export default connectDB;
