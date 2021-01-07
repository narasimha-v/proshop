import { Model, Document } from 'mongoose';

export interface User {
	name: string;
	email: string;
	password: string;
	isAdmin?: boolean;
}

export interface UserDocument extends User, Document {}

export interface UserModel extends Model<UserDocument> {}
