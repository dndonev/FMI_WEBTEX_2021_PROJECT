import { TSharedDirectoryReducerActions } from './shared-directory.actions';
import { SharedDirectoryActionTypes, SharedDirectoryState } from './shared-directory.types';
import { Directory } from '../../interfaces/directory';

const InitialState: SharedDirectoryState = {
    directory: {} as Directory,
    childDirectories: [],
    files: []
}

export const sharedDirectoryReducer = (state = InitialState, action: TSharedDirectoryReducerActions): SharedDirectoryState => {
    switch(action.type) {
        case SharedDirectoryActionTypes.GetSharedDirectory:
            return {
                ...state
            };
        case SharedDirectoryActionTypes.GetSharedDirectorySuccess:
            return  {
                ...state,
                directory: action.data,
                files: action.data.files,
                childDirectories: action.data.children
            };
        case SharedDirectoryActionTypes.GetSharedDirectoryError:
            return {
                ...state
            };
        default:
            return state;
    }
}

export default sharedDirectoryReducer;