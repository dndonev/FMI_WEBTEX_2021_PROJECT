import { TDirectoryReducerActions } from './directory.actions';
import { DirectoryActionTypes, DirectoryState} from './directory.types';
import { Directory } from '../../interfaces/directory';

const InitialState: DirectoryState = {
    directory: {} as Directory,
    childDirectories: [],
    files: []
}

export const directoryReducer = (state = InitialState, action: TDirectoryReducerActions): DirectoryState => {
    switch(action.type) {
        case DirectoryActionTypes.GetDirectory:
            return {
                ...state
            };
        case DirectoryActionTypes.GetDirectorySuccess:
            return  {
                ...state,
                directory: action.data,
                files: action.data.files,
                childDirectories: action.data.children
            };
        case DirectoryActionTypes.GetDirectoryError:
            return {
                ...state
            };
        default:
            return state;
    }
}

export default directoryReducer;