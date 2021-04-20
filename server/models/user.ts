import { Request } from 'express'

export interface User {
	username: string;
	password: string;
}

export interface AuthenticatedUserRequest extends Request {
	user: User
}