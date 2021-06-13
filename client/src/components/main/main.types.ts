import { File } from './../../interfaces/file';
export interface MainComponentProps {
    toggleUploadComponent: boolean;
    toggleMyFilesComponent: boolean;
    toggleSharedComponent: boolean;

    toggleUploadAction: () => void;
    toggleMyFilesAction: () => void;
    toggleSharedAction: () => void;

    file: File;
}