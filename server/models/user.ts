import express from 'express'

export interface User {
	username: string;
	password: string;
}

export interface AuthenticatedUserRequest extends express.Request {
	user: User
}