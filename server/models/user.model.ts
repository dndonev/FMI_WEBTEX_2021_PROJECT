import { Schema, model } from 'mongoose';

const userSchema = new Schema({
	firstName: {
		type: Schema.Types.String,
		reuired: true
	},
	lastName: {
		type: Schema.Types.String,
		reuired: true
	},
	email: {
		type: Schema.Types.String,
		reuired: true,
		match: [/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 'Invalid email']
	},
	password: {
		type: Schema.Types.String,
		reuired: true
	},
	username: {
		type: Schema.Types.String,
		reuired: true
	},
	createDate: {
		type: Schema.Types.Date,
		default: Date.now
	}
});

export const UserModel = model('User', userSchema);