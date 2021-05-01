import { Schema, model } from 'mongoose';

const tokenSchema = new Schema({
	token: Schema.Types.String
});

export const TokenModel = model('Token', tokenSchema);