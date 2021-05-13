import { sign } from 'jsonwebtoken';
import { Tokens } from '../interfaces/tokens';
import { User } from '../interfaces/user';
import { TokenModel } from '../models/token.model';

export function signToken(payload: User): Tokens {
    const accessToken = sign(payload, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '20m' });
    const refreshToken = sign(payload, process.env.REFRESH_TOKEN_SECRET as string);

    return { accessToken, refreshToken };
}

export function saveRefreshToken(refreshToken: string) {
	const token = new TokenModel({
		token: refreshToken
	});

	return token.save();
}