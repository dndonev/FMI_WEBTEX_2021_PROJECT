import { Request } from 'express'
import { Directory } from './directory';

export interface File {
	fileName: string;
	location: string;
	ownerId: string;

	id: string;
    directory: Directory;
    type: string;
    created: Date;
}
export interface FileRequest extends Request {
	file: File
}