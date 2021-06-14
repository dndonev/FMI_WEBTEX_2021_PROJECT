import { Directory } from '../../interfaces/directory';
import { DirectoryState } from '../../redux/directory/directory.types';
export interface FileContainerProps extends DirectoryState {
    getCurrentDirectoryAction: () => void;
    getCurrentDirectoryActionSuccess: (directory: Directory) => void;
    getCurrentDirectoryActionError: () => void;
}