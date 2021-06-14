import { Directory } from '../../interfaces/directory';
import { DirectoryActionTypes } from './directory.types';

export interface IDirectoryBaseAction {
    type: DirectoryActionTypes;
}
export interface ISharedDirectoryBaseAction {
    type: DirectoryActionTypes;
}
export interface IDirectory extends IDirectoryBaseAction {
    type: DirectoryActionTypes.GetDirectory;
}

export interface IDirectorySuccess extends IDirectoryBaseAction {
    type: DirectoryActionTypes.GetDirectorySuccess;
    data: Directory;
}
export interface IDirectoryError extends IDirectoryBaseAction {
    type: DirectoryActionTypes.GetDirectoryError;
}

export type TDirectoryReducerActions = IDirectory
    | IDirectorySuccess
    | IDirectoryError;