import { Request } from 'express'

export interface File {
	fileName: string;
	location: string;
	created: Date;
	owner: string;
}
export interface FileRequest extends Request {
	file: File
}