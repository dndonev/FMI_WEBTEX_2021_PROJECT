import { Directory } from "../../interfaces/directory";
import { File } from '../../interfaces/file';

export enum SharedDirectoryActionTypes {
    GetSharedDirectory = 'GET_SHARED_DIRECTORY',
    GetSharedDirectorySuccess = 'GET_SHARED_DIRECTORY_SUCCESS',
    GetSharedDirectoryError = 'GET_SHARED_DIRECTORY_ERROR'
}

export interface SharedDirectoryState {
    directory: Directory;
    childDirectories: Directory[];
    files: File[];
}
