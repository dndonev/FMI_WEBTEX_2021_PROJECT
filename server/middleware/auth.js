import { verify } from 'jsonwebtoken';

function verifyToken(req, res, next) {
	const authHeader = req.headers.authorization;
	const token = authHeader && authHeader.split(' ').pop();
	if (!token) {
		return res.sendStatus(401);
	}

	const user = verify(token, process.env.ACCESS_TOKEN_SECRET);
	if (!user) {
		return res.sendStatus(403);
	}

	req.user = user;
	next();
}

export default verifyToken;