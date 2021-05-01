import { Request } from 'express'

export interface User {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	username: string;
	createDate: Date;
}

export interface AuthenticatedUserRequest extends Request {
	user: User
}