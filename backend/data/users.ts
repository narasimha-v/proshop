import bcrypt from 'bcrypt';
import { User } from '../types';

const users: User[] = [
	{
		name: 'Admin User',
		email: 'admin@example.com',
		password: bcrypt.hashSync('qty@123', 12),
		isAdmin: true
	},
	{
		name: 'Jhon Doe',
		email: 'jhon@example.com',
		password: bcrypt.hashSync('qty@123', 12)
	},
	{
		name: 'Sara Lee',
		email: 'sara@example.com',
		password: bcrypt.hashSync('qty@123', 12)
	}
];

export default users;
