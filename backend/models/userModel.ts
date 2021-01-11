import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

import { UserDocument } from '../types';

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true,
			unique: true
		},
		password: {
			type: String,
			required: true
		},
		isAdmin: {
			type: Boolean,
			required: true,
			default: false
		}
	},
	{
		timestamps: true
	}
);

userSchema.methods.macthPassword = async function (
	this: UserDocument,
	enteredPassword: string
) {
	return await bcrypt.compare(enteredPassword, this.password);
};

export const User = model<UserDocument>('User', userSchema);
