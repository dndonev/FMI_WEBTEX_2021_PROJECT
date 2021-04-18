
import express from 'express'
import jsonwebtoken from 'jsonwebtoken';

const { sign, verify } = jsonwebtoken;


const router = express.Router();

const refreshTokens = [];

router.post('/token', (req, res) => {
	const refreshToken = req.body.token;

	if (!refreshToken) {
		return res.sendStatus(401);
	}

	if (!refreshTokens.includes(refreshToken)) {
		return res.sendStatus(403);
	}

	verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
		if (err) {
			return res.status(403).send(err);
		}

		const accessToken = sign(user, process.env.ACCESS_TOKEN_SECRET);
		const refreshToken = sign(user, process.env.REFRESH_TOKEN_SECRET)

		refreshTokens.push(refreshToken);
		res.status(200).json({ accessToken, refreshToken }).send();
	});
})

router.post('/register', (req, res) => {

	const username = req.body.username;
	// NEED TO ADD VALIDATION FOR USERNAME/EMAIL AND PASS
	const user = { name: username }
	if (!user) {
		return res.status(404).send('User not found!')
	}

	const accessToken = sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
	const refreshToken = sign(user, process.env.REFRESH_TOKEN_SECRET)

	refreshTokens.push(refreshToken);
	res.status(200).json({ accessToken, refreshToken }).send();
})

export default router;