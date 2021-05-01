
import { Router } from 'express'
import { verify, sign } from 'jsonwebtoken';
import { compareSync, hash } from 'bcrypt'

import { User } from '../../interfaces/user';
import { UserModel } from '../../models/user.model';
import { TokenModel } from '../../models/token.model';

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

authController.post('/login', (req, res) => {
	UserModel.findOne({
		email: req.body.email
	})
		.then(((user: any) => {
			if (user) {
				if (compareSync(req.body.password, user.password)) {
					const payload = {
						id: user._id,
						firstName: user.firstName,
						lastName: user.lastName,
						email: user.email
					}
					const accessToken = sign(payload, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '20m' });
					const refreshToken = sign(payload, process.env.REFRESH_TOKEN_SECRET as string)

					refreshTokens.push(refreshToken);

					res.send({ accessToken, refreshToken })
				} else {
					res.json({ error: 'User does not exist' })
				}
			} else {
				res.json({ error: 'User does not exist' })
			}
		}))
		.catch(err => {
			res.send('error: ' + err)
		})
})

authController.post('/register', (req, res) => {

	const today = new Date()
	const newUser: User = req.body;
	newUser.createDate = today;


	UserModel.findOne({
		email: newUser.email
	})
		.then(user => {
			if (!user) {
				hash(newUser.password, 10, (err: Error, hash: string) => {
					if (err) {
						return res.send('error: ' + JSON.stringify(err))
					}
					newUser.password = hash
					UserModel.create(newUser)
						.then((user: any) => { // TODO: Remove any type
							try {
								const accessToken = sign(newUser, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '20m' });
								const refreshToken = sign(newUser, process.env.REFRESH_TOKEN_SECRET as string)


								const token = new TokenModel({
									token: refreshToken
								});

								token.save()
									.then(() =>
										res.status(200).json({ accessToken, refreshToken, status: newUser.email + ' registered!' }).send())
							} catch (err) {
								res.send('There was an error signing your token');
							}
						})
						.catch(err => {
							res.send('error: ' + err)
						})
				})
			} else {
				res.json({ error: 'User already exists' })
			}
		})
		.catch((err: Error) => {
			res.send('error: ' + err)
		})
});

authController.post('/logout', (req, res) => {
	const token: string = req.body.token;

	if (!token) {
		return res.status(400).send('Invalid token parameter')
	}

	TokenModel.findOneAndRemove({ token })
		.then(() => res.sendStatus(204))
		.catch(() => res.sendStatus(404))
})

export default authController;