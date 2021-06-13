import { Directory } from "../../interfaces/directory";
import { File } from '../../interfaces/file';

export enum DirectoryActionTypes {
    GetDirectory = 'GET_DIRECTORY',
    GetDirectorySuccess = 'GET_DIRECTORY_SUCCESS',
    GetDirectoryError = 'GET_DIRECTORY_ERROR'
}

export interface DirectoryState {
    directory: Directory;
    childDirectories: Directory[];
    files: File[];
}