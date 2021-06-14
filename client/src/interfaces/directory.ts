import { File } from './file';

export interface NewDirectory {
	directoryName: string;
	description: string;
}
export interface Directory extends NewDirectory {
	id: string;
	parent: Directory;
	children: Directory[];
	files: File[];
	ownerId: string;
	isRoot: boolean;
	created: Date;
	type: string;
}
