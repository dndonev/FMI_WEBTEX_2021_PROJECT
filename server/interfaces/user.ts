import { Request } from 'express'

export interface User {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	username: string;
	createDate: Date;
	id: string;
}
export interface AuthenticatedUserRequest extends Request {
	user: User
}