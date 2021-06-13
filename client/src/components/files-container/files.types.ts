import { Directory } from '../../interfaces/directory';
import { DirectoryState } from '../../redux/directory/directory.types';
import { File } from './../../interfaces/file'
export interface FileContainerProps extends DirectoryState {
    getCurrentDirectoryAction: () => void;
    getCurrentDirectoryActionSuccess: (directory: Directory) => void;
    getCurrentDirectoryActionError: () => void;
}