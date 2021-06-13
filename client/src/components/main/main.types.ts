import { File } from '../../../../server/interfaces/file';

export interface MainComponentProps {
    toggleUploadComponent: boolean;
    toggleMyFilesComponent: boolean;
    toggleSharedComponent: boolean;

    toggleUploadAction: () => void;
    toggleMyFilesAction: () => void;
    toggleSharedAction: () => void;

    fileName: string;
	location: string;
	created: Date;
	ownerId: string;
    type: string;
}