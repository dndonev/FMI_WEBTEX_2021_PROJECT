
import { Router } from 'express'
import * as jwt from 'jsonwebtoken';
import { User } from '../../models/user';


const router = Router();

const refreshTokens: string[] = [];

router.post('/token', (req, res) => {
	const refreshToken = req.body.token;

	if (!refreshToken) {
		return res.sendStatus(401);
	}

	if (!refreshTokens.includes(refreshToken)) {
		return res.sendStatus(403);
	}

	let user: User;
	try {
		user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as User;
	} catch (err) {
		res.status(400).json(err).send();
	}
})

router.post('/register', (req, res) => {

	const username = req.body.username;
	const password = '123';
	// NEED TO ADD VALIDATION FOR USERNAME/EMAIL AND PASS
	const user: User = { username, password }
	if (!user) {
		return res.status(404).send('User not found!')
	}

	const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '1h' });
	const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET as string)

	refreshTokens.push(refreshToken);
	res.status(200).json({ accessToken, refreshToken }).send();
})

export default router;