import { sign } from 'jsonwebtoken';
import { Tokens } from '../interfaces/tokens';
import { User } from '../interfaces/user';
import { RefreshTokenModel } from '../models/token.model';

export const signToken = (payload: User): Tokens => {
	const accessToken = sign(payload, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '20m' });
	const refreshToken = sign(payload, process.env.REFRESH_TOKEN_SECRET as string);

	return { accessToken, refreshToken };
}

export const saveRefreshToken = (refreshToken: string) => {
	const token = new RefreshTokenModel({
		refreshToken
	});

	return token.save();
}