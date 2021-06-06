import { Request } from 'express'

export interface Directory {
	directoryName: string;
	location: string;
	created: Date;
	owner: string;
    description: string;
}
export interface DirectoryRequest extends Request {
	directory: Directory;
}