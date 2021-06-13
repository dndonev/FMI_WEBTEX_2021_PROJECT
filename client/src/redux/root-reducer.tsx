import { connectRouter, RouterState } from 'connected-react-router';
import { combineReducers } from 'redux';

import modalReducer from './modal-visibility/modal.reducer';
import { ModalState } from './modal-visibility/modal.types';
import userReducer from './user/user.reducer';
import { UserState } from './user/user.types';
import storage from 'redux-persist/lib/storage';
import {persistReducer} from 'redux-persist';
import { PersistPartial } from 'redux-persist/es/persistReducer';
import componentReducer from './component-visibility/component.reducer';
import { ComponentState } from './component-visibility/component.types';
import directoryReducer from './directory/directory.reducer';
import { DirectoryState } from './directory/directory.types';
import { SharedDirectoryState } from './shared-directory/shared-directory.types';
import sharedDirectoryReducer from './shared-directory/shared-directory.reducer';

export interface StoreState {
    router: RouterState;
    modal: ModalState;
    user: UserState & PersistPartial;
    component: ComponentState;
    directory: DirectoryState;
    sharedDirectory: SharedDirectoryState;
};

const userConfig = {
    key: 'user',
    storage: storage
}

export const rootReducer = (history: any) => combineReducers<StoreState>({
    router: connectRouter(history),
    modal: modalReducer,
    user: persistReducer(userConfig, userReducer),
    component: componentReducer,
    directory: directoryReducer,
    sharedDirectory: sharedDirectoryReducer,
});

export type RootState = ReturnType<typeof rootReducer>;