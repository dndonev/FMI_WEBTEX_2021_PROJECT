import { Schema, model } from 'mongoose';

const userSchema = new Schema({
	email: Schema.Types.String,
	password: Schema.Types.String
});

export const UserModel = model('User', userSchema);