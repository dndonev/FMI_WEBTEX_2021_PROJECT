
import { Router } from 'express'
import { verify, sign } from 'jsonwebtoken';
import { compareSync, hash } from 'bcrypt'
import mongoose, { NativeError } from 'mongoose';

import { User } from '../../interfaces/user';
import { UserModel } from '../../models/user.model';
import { RefreshTokenModel } from '../../models/token.model';
import { saveRefreshToken, signToken } from '../../utils/token-utils';
import { RefreshToken, Tokens } from '../../interfaces/tokens';

const authController = Router();

authController.post('/token', async (req, res) => {
	const token: string = req.body.token;

	if (!token || token === '') {
		return res.status(400).json({ error: 'Invalid parameter - token' })
	}

	const tokenDocument = await RefreshTokenModel.findOne({ token: token });
	if (!tokenDocument) {
		return res.sendStatus(403);
	}

	const refreshToken: string = (tokenDocument.toJSON() as RefreshToken).refreshToken;

	let user: User;
	try {
		user = verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as User;

		const accessToken: string = sign(user, process.env.ACCESS_TOKEN_SECRET as string);
		res.status(200).json({ accessToken });
	} catch (err) {
		res.status(400).json(err);
	}
});

authController.post('/login', async (req, res) => {
	const email: string = req.body.email;
	if (!email || email === '') {
		return res.status(400).json({ error: 'Invalid email address' })
	}

	const userDocument = await UserModel.findOne({ email });
	if (!userDocument) {
		return res.status(404).json({ error: 'User does not exist' })
	}

	const user: User = userDocument.toJSON() as User;
	if (!compareSync(req.body.password, user.password)) {
		return res.status(403).json({ error: 'Invalid credentials' })
	}

	const tokens: Tokens = signToken(user);

	try {
		await saveRefreshToken(tokens.refreshToken);

		return res.json(tokens);
	} catch (err) {
		return res.json(err);
	};
});

authController.post('/register', async (req, res) => {
	const { email, password } = req.body;

	if (!email || email === '' || !password || password === '') {
		return res.status(400).json({ error: 'Invalid parameters - email/password' })
	}

	const today: Date = new Date();
	const newUser: User = req.body;
	newUser.createDate = today;

	const userDocument = await UserModel.findOne({
		email: newUser.email
	});

	if (!userDocument) {
		const hashed: string = await hash(newUser.password, 10);
		const id = new mongoose.Types.ObjectId();
		newUser.password = hashed;
		newUser.id = id.toHexString();

		const user = new UserModel(newUser);
		const validation: NativeError = user.validateSync();
		if (validation) {
			return res.status(400).json(validation);
		}
		await user.save();

		try {
			const tokens: Tokens = signToken(newUser);

			await saveRefreshToken(tokens.refreshToken)
			return res.json(tokens);
		} catch (err) {
			res.send({ error: 'There was an error signing your token' });
		}
	}

	return res.json({ error: 'User already exists' });
});

authController.post('/logout', async (req, res) => {
	const refreshToken: string = req.body.token;

	if (!refreshToken || refreshToken === '') {
		return res.status(400).json({ error: 'Invalid parameter - token' })
	}

	const tokenDocument = await RefreshTokenModel.findOneAndRemove({ refreshToken })
	if (!tokenDocument) {
		return res.status(403);
	}

	return res.status(204).send('You have been logged out');
});

export default authController;