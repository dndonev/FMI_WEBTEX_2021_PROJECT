import { Directory } from './directory';

export interface File {
	fileName: string;
	ownerId: string;
    extention?: string;
	id: string;
    directory: Directory;
    type: string;
    created: Date;
}
