import { Request } from 'express'

export interface File {
	fileName: string;
	location: string;
	created: Date;
	ownerId: string;
}
export interface FileRequest extends Request {
	file: File
}