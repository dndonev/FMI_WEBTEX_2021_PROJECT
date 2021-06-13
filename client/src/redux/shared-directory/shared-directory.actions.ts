import { Directory } from '../../interfaces/directory';
import { SharedDirectoryActionTypes } from './shared-directory.types';


export interface ISharedDirectoryBaseAction {
    type: SharedDirectoryActionTypes;
}

export interface ISharedDirectory extends ISharedDirectoryBaseAction {
    type: SharedDirectoryActionTypes.GetSharedDirectory;
}

export interface ISharedDirectorySuccess extends ISharedDirectoryBaseAction {
    type: SharedDirectoryActionTypes.GetSharedDirectorySuccess;
    data: Directory;
}
export interface ISharedDirectoryError extends ISharedDirectoryBaseAction {
    type: SharedDirectoryActionTypes.GetSharedDirectoryError;
}

export type TSharedDirectoryReducerActions = ISharedDirectory
    | ISharedDirectorySuccess
    | ISharedDirectoryError;