import { verify } from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { AuthenticatedUserRequest, User } from '../models/user';

function verifyToken(req: AuthenticatedUserRequest, res: Response, next: NextFunction) {
	const authHeader = (req.headers as any).authorization;
	const token = authHeader && authHeader.split(' ').pop();
	if (!token) {
		return res.sendStatus(401);
	}

	const user = verify(token, process.env.ACCESS_TOKEN_SECRET as string) as User;
	if (!user) {
		return res.sendStatus(403);
	}

	req.user = user;
	next();
}

export default verifyToken;