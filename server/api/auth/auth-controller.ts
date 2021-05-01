
import { Router } from 'express'
import { verify, sign } from 'jsonwebtoken';
import { User } from '../../interfaces/user';
import { UserModel } from '../../models/user.model';

const authController = Router();

let refreshTokens: string[] = [];

authController.post('/token', (req, res) => {
	const refreshToken = req.body.token;

	if (!refreshToken) {
		return res.sendStatus(401);
	}

	if (!refreshTokens.includes(refreshToken)) {
		return res.sendStatus(403);
	}

	let user: User;
	try {
		user = verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as User;
		const accessToken = sign(user, process.env.ACCESS_TOKEN_SECRET as string);
		res.status(200).json({ accessToken }).send();
	} catch (err) {
		res.status(400).json(err).send();
	}
});

authController.post('/register', (req, res) => {

	const username = req.body.username;
	const password = '123';
	// NEED TO ADD VALIDATION FOR USERNAME/EMAIL AND PASS

	const registeredUser = new UserModel({
	}).save().then(() => {
		const user: User = { username, password }
		if (!user) {
			return res.status(404).send('User not found!')
		}

		const accessToken = sign(user, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '20m' });
		const refreshToken = sign(user, process.env.REFRESH_TOKEN_SECRET as string)

		refreshTokens.push(refreshToken);
		res.status(200).json({ accessToken, refreshToken }).send();
	})

});

authController.post('/logout', (req, res) => {
	const token: string = req.body.token;

	if (!token) {
		return res.status(400).send('Invalid token parameter')
	}

	refreshTokens = refreshTokens.filter(t => t !== token);
	res.sendStatus(204);
})

export default authController;
