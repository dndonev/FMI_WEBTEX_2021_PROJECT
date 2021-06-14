import { Directory } from '../../interfaces/directory';
import { SharedDirectoryState } from '../../redux/shared-directory/shared-directory.types';

export interface SharedContainerProps extends SharedDirectoryState {
    getSharedDirectoryAction: () => void;
    getSharedDirectoryActionSuccess: (directory: Directory) => void;
    getSharedDirectoryActionError: () => void;
}