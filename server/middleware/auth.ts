import { verify } from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { AuthenticatedUserRequest, User } from '../interfaces/user';

export const verifyToken = (req: AuthenticatedUserRequest, res: Response, next: NextFunction) => {
	const authHeader = (req.headers as any).authorization;
	const token = authHeader && authHeader.split(' ').pop();
	if (!token) {
		return res.sendStatus(401);
	}

	let user: User;
	try {
		user = verify(token, process.env.ACCESS_TOKEN_SECRET as string) as User;
	} catch (err) {
		res.status(403).json(err).send();
	}

	req.user = user;
	next();
}