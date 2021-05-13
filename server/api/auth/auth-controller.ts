
import { Router } from 'express'
import { verify, sign } from 'jsonwebtoken';
import { compareSync, hash } from 'bcrypt'

import { User } from '../../interfaces/user';
import { UserModel } from '../../models/user.model';
import { TokenModel } from '../../models/token.model';
import { saveRefreshToken, signToken } from '../../utils/token-utils';
import { Tokens } from '../../interfaces/tokens';

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
		res.status(200).json({ accessToken });
	} catch (err) {
		res.status(400).json(err);
	}
});

authController.post('/login', (req, res) => {
	UserModel.findOne({
		email: req.body.email
	}).exec()
		.then((result) => {
			if (result) {
				const user: User = result.toJSON() as User;

				if (compareSync(req.body.password, user.password)) {

					const tokens: Tokens = signToken(user);

					saveRefreshToken(tokens.refreshToken)
						.then(() => res.json(tokens))
						.catch((err: Error) => res.json(err));
				} else {
					res.json({ error: 'User does not exist' })
				}
			} else {
				res.json({ error: 'User does not exist' })
			}
		})
		.catch((err: Error) => {
			res.json(err);
		})
})

authController.post('/register', (req, res) => {

	const today = new Date()
	const newUser: User = req.body;
	newUser.createDate = today;

	UserModel.findOne({
		email: newUser.email
	})
		.then(result => {
			if (!result) {
				hash(newUser.password, 10)
					.then((hash: string) => {
						newUser.password = hash;

						const user = new UserModel(newUser);

						user.save()
							.then(() => {
								try {
									const tokens: Tokens = signToken(newUser);

									saveRefreshToken(tokens.refreshToken)
										.then(() => res.json(tokens))
										.catch((err: Error) => res.json(err))	
								} catch (err) {
									res.send({ error: 'There was an error signing your token' });
								}
							})
							.catch((err: Error) => res.json(err))
					})
					.catch((err: Error) => res.json(err))
			} else {
				res.json({ error: 'User already exists' })
			}
		})
		.catch((err: Error) => {
			res.json(err);
		})
});

authController.post('/logout', (req, res) => {
	const token: string = req.body.token;

	if (!token) {
		return res.status(400).send('Invalid token parameter')
	}

	TokenModel.findOneAndRemove({ token })
		.then(() => res.send(204).send('You have been logged out'))
		.catch(() => res.sendStatus(404))
});

export default authController;