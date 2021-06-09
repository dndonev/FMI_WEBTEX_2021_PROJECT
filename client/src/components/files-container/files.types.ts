import { File } from '../../../../server/interfaces/file';

export interface FileContainerProps {
    fileName: string;
	location: string;
	created: Date;
	ownerId: string;
}