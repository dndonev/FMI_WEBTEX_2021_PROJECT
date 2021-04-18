const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
	const authHeader = req.headers.authorization;
	const token = authHeader && authHeader.split(' ').pop();
	if (!token) {
		return res.sendStatus(401);
	}

	const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
	if (!user) {
		return res.sendStatus(403);
	}

	req.user = user;
	next();
}

module.exports = verifyToken;